import React from "react";
import './About.css';

const About = () => (
  <div className="about-container">
    <div className="about-left">
     <img id="starter-image" className="starter-image" src="./images/starter.jpg" alt="Sourdough starter"/>
    </div>
    <div className="about-right">
      <h4>What is Sourdough?</h4>
      <p>Sourdough is bread that is made using naturally occuring wild yeast and lactobacilli (gut-friendly “good” bacteria). These wild yeast and lactobacilli cause the bread to rise without the need to add commercial baker’s yeast and also contribute a characteristic tang to the flavour of the bread. It tends to be more nutritious, flavoursome and easier to digest that bread made using commercial yeast.</p>
      <p>While historically bakers perhaps did not understand the science behind bread making they knew the process to follow and would have typically held back a portion of today’s dough to make tomorrow’s bread, thereby perpetuating a culture of wild yeast and bacteria in the dough which would have leavened their bread.</p>
      <p>Sourdough bread is typically made over the course of three days. This longer, slow fermentation process confers a number of advantages:</p>
      <ul>
        <li>It allows the development of a fuller, richer flavour in the finished bread</li>
        <li>The wild yeast and lactobacilli begin to break down the structure of gluten making it easier to digest</li>
        <li>The pH of the dough decreases which improves the keeping qualities of the bread</li>
        <li>Enzymes produced by the yeast & lactobacilli break down the phytic acid present in the bran, releasing nutrients and making them easier to digest and absorb in the gut</li>
      </ul>
    </div>
  </div>
);

export default About;
