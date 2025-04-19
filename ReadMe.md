# This is Wakanda
This project is dedicated to everyones favourate superhero 
Chadwick Boseman, it is a web-based visual experience built using Three.js, featuring a dynamic cloud and star background with an animated title. It creates an immersive environment with moving clouds, twinkling stars, and a stylish title animation.

## Features

-   **Dynamic Cloud Background:**
    -   Generates a scene with multiple cloud clusters.
    -   Clouds are composed of multiple spheres, creating a fluffy effect.
    -   Clouds move subtly across the screen, creating a sense of depth.
    -   Cloud color and opacity are customizable.
    -   Cloud movement speed and variation are adjustable.
-   **Twinkling Star Field:**
    -   Creates a starry sky with multiple stars.
    -   Stars have varying colors (purple, blue, green, white).
    -   Stars twinkle and rotate slowly.
    -   Star count, size, opacity, and spread are customizable.
-   **Animated Title:**
    -   Displays the title "Long Live The King".
    -   Title fades in and slides up from the bottom.
    -   A custom underline appears beneath the title with a split animation.
    -   Title color, font, and animation timing are customizable.
-   **Background Image:**
    -   Allows for a background image to be displayed behind the clouds and stars.
    -   The image has a subtle edge fade effect.
    -   The image is responsive and resizes with the window.
-   **SVG Gradient Background:**
    -   A subtle gradient background is rendered using SVG.
    -   The gradient transitions from black to dark gray.
-   **Screen Fade-In:**
    -   A smooth fade-in effect is applied when the page loads.
-   **Responsive Design:**
    -   The scene and elements adapt to different screen sizes.
    -   Cloud and star parameters are adjusted on window resize.
-   **Clean Code:**
    -   The project is structured with clear classes and methods.
    -   Code is well-commented for readability.

## Technologies Used

-   **Three.js:** A JavaScript library for creating and displaying animated 3D computer graphics in a web browser.
-   **HTML5:** For structuring the web page.
-   **CSS3:** For styling the elements and animations.
-   **JavaScript (ES6):** For the project's logic and interactivity.
- **SVG:** For creating the background gradient.

## Project Structure

-   **`index.html`:** The main HTML file that sets up the page structure.
-   **`scripts/`:**
    -   **`background.js`:** Contains the `CloudScene` class, responsible for creating and animating the cloud and star background.
    -   **`content.js`:** Contains the `Content` class, responsible for creating and animating the title.
- **`sample.jpg`:** A sample image that can be used as the background image.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```
3.  **Open `index.html` in your web browser.**

## Customization

-   **`background.js`:**
    -   Modify the `cloudParams` object to change the appearance and behavior of the clouds.
    -   Modify the `starParams` object to change the appearance and behavior of the stars.
    -   Change the background image by replacing `sample.jpg` and updating the `addBackgroundImage()` call.
-   **`content.js`:**
    -   Change the title text in the `createTitle()` method.
    -   Adjust the title's style properties (font, color, position) in the `createTitle()` method.
    -   Modify the animation timing and easing in the `animateTitle()` and `animateUnderline()` methods.
- **`index.html`**
    - Update the script tags to point to the correct file paths.

## Future Improvements

-   **More Complex Cloud Shapes:** Explore using different geometries or textures for the clouds.
-   **Interactive Elements:** Add interactivity to the scene, such as mouse-based cloud movement.
-   **Performance Optimization:** Optimize the scene for better performance on lower-end devices.
-   **Parallax Effect:** Add a parallax effect to the clouds and stars for a more dynamic feel.
-   **Audio Integration:** Add background music or sound effects.
- **More complex animations:** Add more complex animations to the title and underline.

## Credits

-   This project utilizes the Three.js library.
-   The background image used in the sample is a placeholder and can be replaced.