function MainLayout({ children }) {
  return (
    <div style={{ flex: 1, padding: "20px", background: "#0f172a", minHeight: "100vh", color: "white" }}>
      <h1 style={{color:"white"}}>Layout Working</h1>
      {children}
    </div>
  );
}

export default MainLayout;