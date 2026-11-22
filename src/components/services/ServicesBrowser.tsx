"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  SearchX,
} from "lucide-react";
import { publicFetch } from "@/lib/api";
import { categories } from "@/lib/constants";
import type { Service } from "@/lib/types";
import ServiceCard from "@/components/ServiceCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function useDebounced<T>(value: T, delay = 400) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

const triggerClass =
  "h-12 w-full rounded-full border-sand bg-ivory px-5 text-espresso focus-visible:border-caramel focus-visible:ring-caramel/20";

const inputClass =
  "h-12 rounded-full border-sand bg-ivory pl-12 pr-4 text-espresso placeholder:text-mocha/70 focus-visible:border-caramel focus-visible:ring-caramel/20";

export default function ServicesBrowser() {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const debouncedSearch = useDebounced(search);
  const debouncedLocation = useDebounced(location);

  useEffect(() => {
    let ignore = false;

    const params = new URLSearchParams();
    if (debouncedSearch.trim()) params.set("search", debouncedSearch.trim());
    if (debouncedLocation.trim())
      params.set("location", debouncedLocation.trim());
    if (category !== "all") params.set("category", category);
    params.set("sort", sort);
    params.set("page", String(page));
    params.set("limit", "9");

    setLoading(true);
    setError("");

    publicFetch(`/api/services?${params.toString()}`)
      .then((data) => {
        if (ignore) return;
        setServices(data.services);
        setTotal(data.total);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [debouncedSearch, debouncedLocation, category, sort, page]);

  const clearFilters = () => {
    setSearch("");
    setLocation("");
    setCategory("all");
    setSort("newest");
    setPage(1);
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-cream to-ivory pb-24 pt-36">
      <div className="pointer-events-none absolute -left-28 top-16 size-96 rounded-full bg-sand/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-60 size-96 rounded-full bg-caramel/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full bg-latte px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] not-italic text-cocoa">
            Browse Services
          </span>
          <h1 className="mt-5 text-4xl text-espresso md:text-6xl">
            Find the perfect match for your day
          </h1>
          <p className="mt-4 text-lg text-mocha">
            Search verified wedding vendors by name, category and location.
          </p>
        </div>

        <div className="mt-12 grid gap-3 rounded-4xl border border-sand/60 bg-white/70 p-4 shadow-[0_20px_60px_rgba(62,46,39,0.1)] backdrop-blur md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by service name"
              className={inputClass}
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-mocha" />
            <Input
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setPage(1);
              }}
              placeholder="Location"
              className={inputClass}
            />
          </div>

          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value ?? "all");
              setPage(1);
            }}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={sort}
            onValueChange={(value) => {
              setSort(value ?? "newest");
              setPage(1);
            }}
          >
            <SelectTrigger className={triggerClass}>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!loading && !error && (
          <p className="mt-8 text-mocha">
            {total} {total === 1 ? "service" : "services"} found
          </p>
        )}

        {loading && (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-[2rem] border border-sand/60 bg-white h-[26rem]"
              >
                <Skeleton className="h-full w-full rounded-none bg-latte" />
                <div className="space-y-3 p-6">
                  <Skeleton className="h-6 w-3/4 bg-latte" />
                  <Skeleton className="h-4 w-1/2 bg-latte" />
                  <Skeleton className="h-4 w-1/3 bg-latte" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="mt-12 rounded-3xl border border-sand/60 bg-white p-12 text-center">
            <p className="text-lg not-italic text-espresso">{error}</p>
            <Button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-espresso text-ivory hover:bg-cocoa"
            >
              Try again
            </Button>
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="mt-12 rounded-3xl border border-dashed border-sand bg-white/60 p-14 text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-latte text-cocoa">
              <SearchX className="size-8" />
            </span>
            <h3 className="mt-5 text-3xl text-espresso">No services found</h3>
            <p className="mt-2 text-mocha">
              Try changing your search or filters.
            </p>
            <Button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-espresso px-6 text-ivory hover:bg-cocoa"
            >
              Clear filters
            </Button>
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <>
            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="mt-14 flex items-center justify-center gap-4">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="rounded-full border-sand px-5 text-cocoa"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>
                <span className="text-sm text-mocha">
                  Page {page} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="rounded-full border-sand px-5 text-cocoa"
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
