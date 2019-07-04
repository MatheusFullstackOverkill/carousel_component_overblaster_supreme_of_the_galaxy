## React component for a simple carousel

####Javascript

    import React, { Component } from 'react';
    //Import Carousel 
    import Carousel from 'carousel_component_overblaster_supreme_of_the_galaxy';
    //Import Carousel's styles
    import 'carousel_component_overblaster_supreme_of_the_galaxy/build/Carousel_styles.css';

    export default class Content extends Component {
        render() {
            return (
                <div>
                    <Carousel
                        autoSlide={true}
                        infinity={true}
                        speed={1000}
                        arrows={true}
                        dots={true}
                    >
                        <div>1</div>
                        <div>2</div>
                        <div>3</div>       
                    </Carousel> 
                </div>
            )
        }
    }



| Option        | Type         | Description  |
| ------------- |:------------:| -----|
| autoSlide     | Boolean      | Defines if the slides should pass automaticly (Only works if *infinity* is true) |
| infinity      | Boolean      | Defines if the slides should pass in a continuous way or stopped at the edges |
| speed         | Number       | Defines the speed of the autoSlide in miliseconds |
| arrows        | Boolean      | Defines if the arrows should appear |
| dots          | Boolean      | Defines if the dots should appear |


PS: I know the name it's kind of silly, i just wanted to know how to upload to npm and help someone in the process.