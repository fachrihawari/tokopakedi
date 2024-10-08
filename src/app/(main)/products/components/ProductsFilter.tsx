"use client"

import { getProductsFacets, GetProductsFacetsResponse } from "@/lib/actions/products";
import { formatCurrency, formatCompactNumber } from "@/lib/utils/number";
import { setQueryParams } from "@/lib/utils/url";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { IoMdStar } from "react-icons/io";

export default function ProductsFilter() {
  const router = useRouter();
  const searchParamsHook = useSearchParams()
  const [loading, setLoading] = useState(true);
  const [facets, setFacets] = useState<GetProductsFacetsResponse>({ priceRanges: [], categories: [] });

  const searchParams = useMemo(() => searchParamsHook ?? new URLSearchParams(), [searchParamsHook])
  const searchParamsObject = useMemo(() => Object.fromEntries(searchParams.entries() ?? []), [searchParams]);
  useEffect(() => {
    const fetchFacets = async () => {
      const result = await getProductsFacets(searchParamsObject);
      setFacets(result);
      setLoading(false);
    };
    fetchFacets();
  }, [searchParamsObject]);

  const handleFilter = (key: string, value: string) => {
    const isSelected = searchParams.get(key) === value;
    const newSearchParams = setQueryParams({ [key]: isSelected ? '' : value, page: '1' }, searchParams);
    router.push(`/products?${newSearchParams.toString()}`);
  };

  const handleCategoryChange = (category: string, isChecked: boolean) => {
    const currentCategories = searchParams.getAll('categories');
    let newCategories;
    if (isChecked) {
      newCategories = [...currentCategories, category];
    } else {
      newCategories = currentCategories.filter(c => c !== category);
    }
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete('categories');
    newCategories.forEach(c => newSearchParams.append('categories', c));
    newSearchParams.set('page', '1');
    router.push(`/products?${newSearchParams.toString()}`);
  };

  const contentLoader = loading && (
    <div className="space-y-2">
      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
    </div>
  )

  return (
    <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-4 sticky top-24 self-start">
      <h2 className="text-lg font-bold mb-2">Filter</h2>
      <div className="bg-white p-4 rounded-lg shadow">

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
          {contentLoader}
          <div className="space-y-2">
            {facets.categories.map((category) => (
              <label key={category._id} className="flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center">
                  <input
                    name='categories'
                    type="checkbox"
                    className="mr-2 w-4 h-4"
                    value={category._id}
                    checked={searchParams.getAll('categories').includes(category._id)}
                    onChange={(e) => handleCategoryChange(category._id, e.target.checked)}
                  />
                  <span>{category._id}</span>
                </div>
                <span className="bg-gray-200 text-gray-700 text-center min-w-6 px-2 py-1 rounded-full text-xs font-medium">
                  {formatCompactNumber(category.count)}
                </span>
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Rentang Harga</label>
          {/* Enable logic price range */}
          {/*
          <div className="flex flex-col space-y-2">
            <input
              type="number"
              name="priceRangeMin"
              placeholder="Rp Min"
              className="w-full p-2 border rounded text-sm"
              onChange={(e) => handleFilter('priceRangeMin', e.target.value)}
              value={searchParams.get('priceRangeMin') || ''}
            />
            <input
              type="number"
              name="priceRangeMax"
              placeholder="Rp Max"
              className="w-full p-2 border rounded text-sm"
              onChange={(e) => handleFilter('priceRangeMax', e.target.value)}
              value={searchParams.get('priceRangeMax') || ''}
            />
          </div>
          */}
          {contentLoader}
          <div className="mt-2 flex flex-wrap gap-2">
            {facets.priceRanges.map(pr => {
              const priceRangeValue = `${pr._id.min}-${pr._id.max}`;
              return (
                <label key={priceRangeValue} className="relative">
                  <input
                    type="radio"
                    name="priceRange"
                    value={priceRangeValue}
                    checked={searchParams.get('priceRange') === priceRangeValue}
                    onClick={() => handleFilter('priceRange', priceRangeValue)}
                    onChange={() => handleFilter('priceRange', priceRangeValue)}
                    className="peer absolute opacity-0 w-full h-full cursor-pointer"
                  />
                  <span className="bg-white text-gray-700 text-sm font-medium px-3 py-2 rounded border border-gray-300 hover:border-green-500 cursor-pointer transition-colors duration-200 inline-block peer-checked:bg-green-500 peer-checked:text-white peer-checked:border-green-500">
                    {formatCurrency(pr._id.min)} - {formatCurrency(pr._id.max)}
                  </span>
                </label>
              )
            })}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
          {contentLoader}
          <div className="space-y-2">
            {!loading && <label className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={searchParams.get('rating') === '4'}
                value={4}
                name="rating"
                onChange={() => handleFilter('rating', '4')}
                className="mr-2 w-4 h-4"
              />
              <IoMdStar size={18} className="text-yellow-500 mr-1" />
              4 keatas
            </label>}
          </div>
        </div>
      </div>
    </div>
  );
}
