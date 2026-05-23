import NavBar from "../components/NavBar";

function About() {
  return (
    <>
      <NavBar />
      <main>
        <h1>About the Air Con Sales App</h1>
        <p>This application showcases a list of air conditioning products and their specifications. Users can:</p>
        <ul>
          <li>Browse a list of products and their details.</li>
          <li>Add new products to the inventory.</li>
          <li>View detailed information about individual products.</li>
        </ul>
        <p>The application is built with React and React Router v6, demonstrating concepts such as nested routing, dynamic URL parameters, and programmatic navigation.</p>
      </main>
    </>
  );
}

export default About;
