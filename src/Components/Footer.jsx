
import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer 
      className="mt-auto py-3"
      style={{
        background: "#212529",
        borderTop: "2px solid #0d6efd",
        color: "#fff"
       
      }}
    >
      <Container>
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">

          <div>
            <h6 className="fw-bold text-primary mb-2">
              ShopStream
            </h6>

            <small style={{ color: "#adb5bd" }}>
              Premium destination for curated
              technology and lifestyle products.
            </small>
          </div>

          <div className="d-flex gap-4 flex-wrap">
            <a href="#" style={{ color: "#adb5bd", textDecoration: "none", whiteSpace: "nowrap" }}>Privacy Policy</a>
            <a href="#" style={{ color: "#adb5bd", textDecoration: "none", whiteSpace: "nowrap" }}>Terms of Service</a>
            <a href="#" style={{ color: "#adb5bd", textDecoration: "none", whiteSpace: "nowrap" }}>Contact Us</a>
            <a href="#" style={{ color: "#adb5bd", textDecoration: "none", whiteSpace: "nowrap" }}>Shipping Info</a>
          </div>

        </div>

        <hr style={{ borderColor: "#6c757d", opacity: 0.3 }} />

        <p className="text-center mb-0" style={{ color: "#adb5bd", fontSize: "13px" }}>
          © 2026 ShopStream. All rights reserved.
        </p>

      </Container>
    </footer>
  );
}
