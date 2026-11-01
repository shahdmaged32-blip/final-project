import { Container } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className=" bg-dark-subtle border-top mt-2 py-3">
      <Container>

        <div className="d-flex justify-content-between align-items-center">

          <div>
            <h6 className="fw-bold text-primary">
              ShopStream
            </h6>

            <small className="text-muted">
              Premium destination for curated
              technology and lifestyle products.
            </small>
          </div>

          <div className="d-flex gap-4 flex-nowrap ">
           <a href="#" style={{ whiteSpace: "nowrap"}}>Privacy Policy</a> 
           <a href="#" style={{ whiteSpace: "nowrap" }}> Terms of Service </a>
           <a href="#" style={{ whiteSpace: "nowrap" }}>Contact Us</a> 
            <a href="#" style={{ whiteSpace: "nowrap" }}>Shipping Info</a>
          </div>
 <p className="text-center text-muted">
          © 2026 ShopStream. All rights reserved.
        </p>
        </div>

    
        

      </Container>
    </footer>
  );
}
