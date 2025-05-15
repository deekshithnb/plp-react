export default function Pagination({
  pageInfo,
  totalProducts,
  refetchProductData,
}) {
  return (
    <div>
      <p>Total Products:{totalProducts}</p>
      <div>
        <button
          onClick={() => refetchProductData(pageInfo?.current_page - 1)}
          disabled={pageInfo?.current_page === 1}
        >
          Prev
        </button>
        <button
          onClick={() => refetchProductData(pageInfo?.current_page + 1)}
          disabled={pageInfo?.current_page === pageInfo?.total_pages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
