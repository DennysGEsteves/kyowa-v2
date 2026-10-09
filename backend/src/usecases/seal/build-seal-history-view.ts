import { SealEntity } from '../../entities/seal';
import { SealHistoryViewItem } from '../../entities/seal/types/seal-detail';
import { SEAL_HISTORY_EVENT_CREATED } from '../../entities/seal/types/seal-history-item';

type ResolveUserName = (userId: string) => Promise<string>;
type ResolveStoreName = (storeId: string) => Promise<string>;
type ResolveProductName = (productId: string) => Promise<string>;

function isCreationEvent(data: Record<string, unknown>): boolean {
  return data.event === SEAL_HISTORY_EVENT_CREATED;
}

function findLegacyCreationEntry(
  seal: SealEntity,
): SealEntity['history'][number] | undefined {
  const emptyDataEntries = seal.history.filter(
    (entry) => Object.keys(entry.data).length === 0,
  );

  if (emptyDataEntries.length === 0) {
    return undefined;
  }

  return emptyDataEntries.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
  )[0];
}

async function enrichCreationData(
  data: Record<string, unknown>,
  resolveStoreName: ResolveStoreName,
  resolveProductName: ResolveProductName,
): Promise<Record<string, unknown>> {
  const enriched = { ...data };

  if (typeof enriched.storeId === 'string' && !enriched.storeName) {
    enriched.storeName = await resolveStoreName(enriched.storeId);
  }

  if (typeof enriched.productId === 'string' && !enriched.productName) {
    enriched.productName = await resolveProductName(enriched.productId);
  }

  return enriched;
}

export async function buildSealHistoryView(
  seal: SealEntity,
  resolveUserName: ResolveUserName,
  resolveStoreName: ResolveStoreName,
  resolveProductName: ResolveProductName,
): Promise<SealHistoryViewItem[]> {
  const hasCreation = seal.history.some((entry) =>
    isCreationEvent(entry.data),
  );

  const entries = [...seal.history];

  if (!hasCreation) {
    const legacyCreation = findLegacyCreationEntry(seal);

    if (legacyCreation) {
      const index = entries.indexOf(legacyCreation);
      if (index >= 0) {
        entries[index] = {
          ...legacyCreation,
          data: {
            event: SEAL_HISTORY_EVENT_CREATED,
            number: seal.number,
            storeId: seal.storeId,
            productId: seal.productId,
          },
        };
      }
    } else {
      const createdAt = seal.createdAt ?? entries[0]?.createdAt ?? new Date();
      const userId = entries[0]?.userId ?? '';

      entries.unshift({
        status: entries[0]?.status ?? seal.status,
        userId,
        createdAt,
        data: {
          event: SEAL_HISTORY_EVENT_CREATED,
          number: seal.number,
          storeId: seal.storeId,
          productId: seal.productId,
        },
      });
    }
  }

  const history = await Promise.all(
    entries.map(async (entry) => {
      let data = { ...entry.data };

      if (isCreationEvent(data)) {
        data = await enrichCreationData(
          data,
          resolveStoreName,
          resolveProductName,
        );
      } else {
        const previousStoreId = data.previousStoreId;
        const storeId = data.storeId;
        if (
          typeof previousStoreId === 'string' &&
          typeof storeId === 'string' &&
          previousStoreId !== storeId
        ) {
          data.storeName = await resolveStoreName(storeId);
        }
      }

      return {
        status: entry.status,
        userId: entry.userId,
        userName: await resolveUserName(entry.userId),
        data,
        createdAt: entry.createdAt,
      };
    }),
  );

  history.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  return history;
}
