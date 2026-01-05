import Layout from "~/components/Layout";

export default function Loading() {
  return (
    <Layout>
      <section className="section-padding bg-gradient-to-b from-amber-50 to-white">
        <div className="container-wide max-w-4xl">
          <div className="mb-6 h-10 w-32 animate-pulse rounded bg-gray-200"></div>

          <div className="rounded-xl bg-white p-8 shadow-lg">
            <div className="mb-4 flex justify-between">
              <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200"></div>
              <div className="h-6 w-20 animate-pulse rounded bg-gray-200"></div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-6 w-1/2 animate-pulse rounded bg-gray-200"
                ></div>
              ))}
            </div>

            <div className="mb-6 border-t pt-6">
              <div className="mb-4 h-8 w-1/3 animate-pulse rounded bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200"></div>
                <div className="h-4 w-4/6 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>

            <div className="mb-6 border-t pt-6">
              <div className="mb-4 h-8 w-1/4 animate-pulse rounded bg-gray-200"></div>
              <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            </div>

            <div className="border-t pt-6">
              <div className="h-12 w-full animate-pulse rounded bg-gray-200 md:w-48"></div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
