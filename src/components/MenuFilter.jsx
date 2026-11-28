import { Button, Form, Modal } from "react-bootstrap";
const categories = ["All","Hot Coffee","Iced Coffee","Cold Drinks","Desserts"];

export default function MenuFilter({
  isMobile = false, activeCategory,
  onCategoryChange,
  selectedCategory,
  setSelectedCategory,
  showFilter,
  setShowFilter,
  onApply,
  onReset,
}) {
  if (!isMobile) {
    return (
      <div
        className="d-flex align-items-center justify-content-center flex-nowrap gap-1 rounded-pill p-1"
        style={{ backgroundColor: "#F8EFDF", width: "fit-content", whiteSpace: "nowrap" }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <Button
              key={category}
              onClick={() => onCategoryChange(category)}
              className="rounded-pill border-0 flex-shrink-0"
              style={{
                backgroundColor: isActive ? "#60412C" : "transparent",
                color: isActive ? "#FFFFFF" : "#806B5B",
                fontSize: "10px",
                fontWeight: 500,
                padding: "9px 13px",
                whiteSpace: "nowrap",
              }}
            >
              {category}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <>
      <Button
        variant="link"
        className="w-100 text-decoration-none rounded-0 border-0 py-3 d-flex align-items-center justify-content-center gap-2"
        style={{ color: "#493326", fontSize: "11px", fontWeight: 600, letterSpacing: "1px" }}
        onClick={() => {
          setSelectedCategory(activeCategory);
          setShowFilter(true);
        }}
      >
        <i className="bi bi-sliders" />
        FILTER
      </Button>

      <Modal show={showFilter} onHide={() => setShowFilter(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#F5EFE6", borderColor: "#E5D7C4" }}>
          <Modal.Title style={{ color: "#493326", fontFamily: "var(--font-display)" }}>
            Filter By
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#F5EFE6" }}>
          <Form>
            {categories.map((category) => (
              <Form.Check
                key={category}
                type="radio"
                name="category"
                label={category}
                id={`filter-${category}`}
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="mb-3"
              />
            ))}
          </Form>
        </Modal.Body>

        <Modal.Footer style={{ backgroundColor: "#F5EFE6", borderColor: "#E5D7C4" }}>
          <Button variant="link" className="text-decoration-none" style={{ color: "#806B5B" }} onClick={onReset}>
            Reset
          </Button>

          <Button className="border-0 rounded-pill px-4" style={{ backgroundColor: "#493326" }} onClick={onApply}>
            Apply Filter
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
