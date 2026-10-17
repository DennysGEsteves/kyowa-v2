/**
 * Insere orçamentos de teste para paginação e filtros.
 * Uso: node --env-file=.env scripts/seed-budgets.mjs [quantidade]
 */
import mongoose from 'mongoose';

const COUNT = Math.max(1, parseInt(process.argv[2] ?? '20', 10) || 20);
const uri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/kyowa';

const STATUSES = ['open', 'closed', 'inactive', 'lost'];
const CLOSING_AT = [
  'until3days',
  'from4to7',
  'from8to10',
  'from11to15',
  'from16to30',
  'none',
];
const CLOSING_LEVEL = ['high', 'normal', 'low'];

async function getNextSequentialId(db) {
  const latest = await db
    .collection('budgets')
    .findOne(
      { sequentialId: { $ne: null } },
      { sort: { sequentialId: -1 }, projection: { sequentialId: 1 } },
    );
  return (latest?.sequentialId ?? 0) + 1;
}

function daysAgo(n) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() - n);
  return d;
}

async function main() {
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const users = await db.collection('users').find({}).limit(5).toArray();
  const stores = await db.collection('stores').find({}).limit(5).toArray();
  const clients = await db.collection('clients').find({}).limit(8).toArray();
  const architects = await db.collection('architects').find({}).limit(5).toArray();
  const categories = await db
    .collection('products_category')
    .find({})
    .limit(1)
    .toArray();

  if (!users.length) {
    console.error('Nenhum usuário no banco. Crie um usuário antes.');
    process.exit(1);
  }
  if (!stores.length) {
    console.error('Nenhuma loja no banco. Cadastre lojas antes.');
    process.exit(1);
  }

  let nextId = await getNextSequentialId(db);
  const categoryId = categories[0]?._id ?? null;
  const docs = [];

  for (let i = 0; i < COUNT; i++) {
    const user = users[i % users.length];
    const store = stores[i % stores.length];
    const client = clients.length ? clients[i % clients.length] : null;
    const architect = architects.length ? architects[i % architects.length] : null;
    const status = STATUSES[i % STATUSES.length];
    const closingAt =
      status === 'open' ? CLOSING_AT[i % CLOSING_AT.length] : null;
    const closingLevel =
      status === 'open' && closingAt && closingAt !== 'none'
        ? CLOSING_LEVEL[i % CLOSING_LEVEL.length]
        : null;

    const quantity = 1 + (i % 3);
    const unitPrice = 500 + i * 137;
    const checkout =
      categoryId
        ? [
            {
              quantity,
              categoryId,
              price: quantity * unitPrice,
              description: `Item teste seed #${i + 1}`,
            },
          ]
        : [];
    const total = checkout.reduce((s, line) => s + line.price, 0);
    const createdAt = daysAgo(i % 28);

    docs.push({
      sequentialId: nextId++,
      clientId: client?._id ?? null,
      userId: user._id,
      storeId: store._id,
      architectId: architect?._id ?? null,
      obs: i % 4 === 0 ? `Observação seed ${nextId - 1}` : null,
      lostReasons: status === 'lost' ? 'Preço / concorrência (seed)' : null,
      total: checkout.length ? total : null,
      status,
      closingAt,
      closingLevel,
      checkout,
      history: [
        {
          userId: user._id,
          createdAt,
          data: {
            event: 'created',
            storeId: store._id,
            clientId: client?._id ?? null,
            architectId: architect?._id ?? null,
            status,
          },
        },
      ],
      createdAt,
    });
  }

  const result = await db.collection('budgets').insertMany(docs);
  console.log(
    `Inseridos ${result.insertedCount} orçamentos (sequentialId ${docs[0].sequentialId}–${docs[docs.length - 1].sequentialId}).`,
  );
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
