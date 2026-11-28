
import { useMemo, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import useProducts from "../hooks/useProducts";
import { useIsMobile } from "../hooks/useMobile";
import ProductCard from "../components/ProductCard";
import MenuSectionHeader from "../components/MenuSectionHeader";
import MenuFilter from "../components/MenuFilter";
import MenuSort from "../components/MenuSort";

export default function Menu() {
  const { products, loading, error } = useProducts();
  const isMobile = useIsMobile();

  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [draftSort, setDraftSort] = useState("featured");
  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const displayedProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter(
        (product) => product.cat?.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    switch (sortBy) {
      case "low-high":
        result.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [products, activeCategory, sortBy]);

  const handleApplyFilter = () => {
    setActiveCategory(selectedCategory);
    setShowFilter(false);
  };

  const handleResetFilter = () => {
    setSelectedCategory("All");
    setActiveCategory("All");
    setShowFilter(false);
  };

  const handleApplySort = () => {
    setSortBy(draftSort);
    setShowSort(false);
  };

  const handleResetSort = () => {
    setDraftSort("featured");
    setSortBy("featured");
    setShowSort(false);
  };

  return (
    <section className="mt-4 pt-5 pb-5" style={{ backgroundColor: "#F5EFE6", color: "#2B1E18", minHeight: "100vh" }}>
      <Container>
        <MenuSectionHeader
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        {isMobile && (
          <div className="d-flex align-items-center w-100 rounded-pill overflow-hidden mb-4" style={{ backgroundColor: "#F8EFDF" }}>
            <div className="flex-fill">
              <MenuFilter
                isMobile
                activeCategory={activeCategory}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                showFilter={showFilter}
                setShowFilter={setShowFilter}
                onApply={handleApplyFilter}
                onReset={handleResetFilter}
              />
            </div>

            <div style={{ width: "1px", height: "28px", backgroundColor: "#D8C0A5" }} />

            <div className="flex-fill">
              <MenuSort
                isMobile
                sortBy={sortBy}
                draftSort={draftSort}
                setDraftSort={setDraftSort}
                showSort={showSort}
                setShowSort={setShowSort}
                onApply={handleApplySort}
                onReset={handleResetSort}
              />
            </div>
          </div>
        )}

        <div className="mt-4">
          {loading ? (
            <p className="text-center py-5">Loading...</p>
          ) : error ? (
            <p className="text-center py-5">Error: {error.message}</p>
          ) : displayedProducts.length === 0 ? (
            <p className="text-center py-5">No products found.</p>
          ) : (
            <Row xs={2} md={3} lg={4} className="g-3 g-md-4">
              {displayedProducts.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </Container>
    </section>
  );
}
