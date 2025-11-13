import Header from "../header/header.tsx";

const IntroductoryPage = () => {
  return (

    <>
      <Header />
      <div className="introductoryPage-container">
        <h1>
          <strong>Hi, my name is <span className="span-name">Roma</span></strong> <br /><em

        > <span> Designer</span></em>
          <span> and developer of things</span>
        </h1>
        <p>A frontend developer. <span className="span-text">Let me show you...</span>
        </p>
      </div>
    </>
  );
};

export default IntroductoryPage;