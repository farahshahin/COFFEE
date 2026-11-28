import { Button, Form, Modal } from "react-bootstrap";
const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "low-high", label: "Price: Low to High" },
  { value: "high-low", label: "Price: High to Low" },
  { value: "name", label: "Name" },
];

export default function MenuSort({
  isMobile = false,
  sortBy,
  setSortBy,
  draftSort,
  setDraftSort,
  showSort,
  setShowSort,
  onApply,
  onReset,
}) {
  if (!isMobile) {
    return (
      <div className="d-flex align-items-center gap-2">
        <span style={{ color: "#806B5B", fontSize: "10px", letterSpacing: "1px" }}>
          SORT BY
        </span>

        <Form.Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            width: "136px",
            backgroundColor: "#F8EFDF",
            borderColor: "#E5D7C4",
            color: "#493326",
            fontSize: "11px",
            borderRadius: "20px",
            boxShadow: "none",
          }}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
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
          setDraftSort(sortBy);
          setShowSort(true);
        }}
      >
        <i className="bi bi-sort-down" />
        SORT
      </Button>

      <Modal show={showSort} onHide={() => setShowSort(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#F5EFE6", borderColor: "#E5D7C4" }}>
          <Modal.Title style={{ color: "#493326", fontFamily: "var(--font-display)" }}>
            Sort By
          </Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ backgroundColor: "#F5EFE6" }}>
          <Form>
            {sortOptions.map((option) => (
              <Form.Check
                key={option.value}
                type="radio"
                name="sort"
                label={option.label}
                id={`sort-${option.value}`}
                checked={draftSort === option.value}
                onChange={() => setDraftSort(option.value)}
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
            Apply Sort
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
