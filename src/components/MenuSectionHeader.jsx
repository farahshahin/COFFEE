import { useIsMobile } from "../hooks/useMobile";
import MenuFilter from "./MenuFilter";
import MenuSort from "./MenuSort";

export default function MenuSectionHeader({ activeCategory, setActiveCategory, sortBy, setSortBy }) {
  const isMobile = useIsMobile();

  return (
    <div className="mb-4">
      {!isMobile ? (
        <>
          <p className="mb-2" style={{ color: "#B88955", fontSize: "9px", letterSpacing: "3px" }}>
            — COFFEE & DESSERTS
          </p>

          <div className="d-flex align-items-center justify-content-between gap-3 flex-nowrap">
            <h1 className="mb-0 flex-shrink-0" style={{ color: "#493326", fontFamily: "var(--font-display)", fontSize: "56px", fontWeight: 400, lineHeight: 1 }}>
              Menu
            </h1>

            <div className="flex-grow-1 d-flex justify-content-center">
              <MenuFilter activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
            </div>

            <div className="flex-shrink-0">
              <MenuSort sortBy={sortBy} setSortBy={setSortBy} />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="mb-2" style={{ color: "#B88955", fontSize: "9px", letterSpacing: "3px" }}>
            — COFFEE & DESSERTS
          </p>

          <h1 className="mb-0" style={{ color: "#493326", fontFamily: "var(--font-display)", fontSize: "42px", fontWeight: 400, lineHeight: 1 }}>
            Menu
          </h1>
        </div>
      )}
    </div>
  );
}
