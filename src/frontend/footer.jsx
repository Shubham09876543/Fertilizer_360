
const Footer = () => {
    return (
      <footer style={styles.footer}>
        <div style={styles.container}>
          <h2 style={styles.title}>
            <span style={styles.brand}>Fertilizer360</span> . We're here
          </h2>
          <p style={styles.description}>
            Hello, we are Fertilizer360, trying to make an effort to put the right people for you to get the best results. Just insight.
          </p>
  
          {/* Office Location & Subscription */}
          <div style={styles.infoContainer}>
            {/* Office Location */}
            <div>
              <h3 style={styles.sectionTitle}>Office Location</h3>
              <p style={styles.text}>RK University City Rajkot</p>
              <p style={styles.text}>360020 Gujarat</p>
              <p style={styles.text}>India</p>
            </div>
  
            {/* Subscription */}
            <div>
              <h3 style={styles.sectionTitle}>Subscribe</h3>
              <div style={styles.subscribeContainer}>
                <input type="email" placeholder="Enter your email address" style={styles.input} />
                <button style={styles.subscribeButton}>📩</button>
              </div>
            </div>
          </div>
  
          {/* Bottom Footer */}
          <div style={styles.bottomFooter}>
            <img src="../src/assets/logo.png" alt="Fertilizer360 Logo" style={styles.footerLogo} />
            <p style={styles.copyright}>&copy; 2025 Fertilizer360. All rights reserved.</p>
  
            {/* Social Icons */}
            <div style={styles.socialIcons}>
              <a href="#" style={styles.icon}>🌐</a>
              <a href="#" style={styles.icon}>🔗</a>
              <a href="#" style={styles.icon}>🐦</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  const styles = {
    footer: {
      backgroundColor: "#ffffff",
      padding: "40px 20px",
      textAlign: "center",
    },
    container: {
      maxWidth: "900px",
      margin: "0 auto",
    },
    title: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#000",
    },
    brand: {
      color: "#23395d",
    },
    description: {
      color: "#666",
      marginBottom: "20px",
    },
    infoContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      marginBottom: "30px",
    },
    sectionTitle: {
      fontSize: "16px",
      fontWeight: "bold",
      color: "#000",
      display: "flex"
    },
    text: {
      color: "#555",
      margin: "5px 0",
      display: "flex"

    },
    subscribeContainer: {
      display: "flex",
      alignItems: "center",
      borderBottom: "1px solid #ccc",
      paddingBottom: "5px",
    },
    input: {
      flex: 1,
      border: "none",
      outline: "none",
      padding: "5px",
      fontSize: "14px",
    },
    subscribeButton: {
      background: "none",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
    },
    bottomFooter: {
      borderTop: "1px solid #ddd",
      paddingTop: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
    },
    footerLogo: {
      width: "50px",
    },
    copyright: {
      fontSize: "14px",
      color: "#666",
    },
    socialIcons: {
      display: "flex",
      gap: "15px",
    },
    icon: {
      textDecoration: "none",
      fontSize: "18px",
      color: "#666",
    },
  };
  
  export default Footer;
  