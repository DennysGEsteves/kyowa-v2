import type { ProductLookup } from "@entities";
import { Fetch } from "@utils";
import type { ProductLookupSlug } from "./product-lookups.config";
import type { UpsertProductLookupDTO } from "./ProductLookups.dto";

function lookupPath(slug: ProductLookupSlug): string {
  return `/products/${slug}`;
}

export const ProductLookupsApi = () => {
  async function getAll(slug: ProductLookupSlug): Promise<ProductLookup[]> {
    const response = await Fetch.get<ProductLookup[]>({
      url: lookupPath(slug),
    });
    return response.data;
  }

  async function create(
    slug: ProductLookupSlug,
    data: UpsertProductLookupDTO,
  ): Promise<ProductLookup> {
    const response = await Fetch.post<ProductLookup>({
      url: lookupPath(slug),
      data,
    });
    return response.data;
  }

  async function update(
    slug: ProductLookupSlug,
    id: string,
    data: UpsertProductLookupDTO,
  ): Promise<ProductLookup> {
    const response = await Fetch.patch<ProductLookup>({
      url: `${lookupPath(slug)}/${id}`,
      data,
    });
    return response.data;
  }

  async function remove(slug: ProductLookupSlug, id: string): Promise<void> {
    await Fetch.delete({
      url: `${lookupPath(slug)}/${id}`,
    });
  }

  async function getCategories(): Promise<ProductLookup[]> {
    return getAll("categories");
  }

  async function getColors(): Promise<ProductLookup[]> {
    return getAll("colors");
  }

  async function getDesigns(): Promise<ProductLookup[]> {
    return getAll("designs");
  }

  async function getHeights(): Promise<ProductLookup[]> {
    return getAll("heights");
  }

  async function getModels(): Promise<ProductLookup[]> {
    return getAll("models");
  }

  async function getOrigins(): Promise<ProductLookup[]> {
    return getAll("origins");
  }

  async function getShapes(): Promise<ProductLookup[]> {
    return getAll("shapes");
  }

  async function getSizes(): Promise<ProductLookup[]> {
    return getAll("sizes");
  }

  async function getUnits(): Promise<ProductLookup[]> {
    return getAll("units");
  }

  return {
    getAll,
    create,
    update,
    remove,
    getCategories,
    getColors,
    getDesigns,
    getHeights,
    getModels,
    getOrigins,
    getShapes,
    getSizes,
    getUnits,
  };
};
