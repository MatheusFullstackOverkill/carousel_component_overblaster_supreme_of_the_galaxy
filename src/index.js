import React, { Component } from 'react'

export default class Carousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carrousel: null,
            left: 0,
            slideWidth: 0,
            currentSlide: 0,
            mouseOutside: true,
            interval: null,
            autoSlide:false,
            infinity:true,
            speed:2000,
            arrows:true,
            dots:true,
            translating: false
        };

        this.carrousel = React.createRef();
        this.fullCarrousel = React.createRef();
        this.slideAnimation = this.slideAnimation.bind(this);

        this.leftArrow = React.createRef();
        this.rightArrow = React.createRef();
    };
    
    slideAnimation(side) {
        if(this.state.translating == false) {
            this.setState({translating: true});
            setTimeout(() => { this.setState({translating: false})}, this.state.speed);
            this.fullCarrousel.current.style.transition = '0.5s';
            if(side == 'left') {
                this.setState({left: (this.state.left + this.state.slideWidth)});
                this.setState({currentSlide: this.state.currentSlide-=1})
            } else if(side == 'right' || side == undefined) {
                this.setState({left: (this.state.left - this.state.slideWidth)});
                this.setState({currentSlide: this.state.currentSlide+=1});
            } else {
                this.setState({left: -(this.state.slideWidth * (side+1))});
                this.setState({currentSlide: side});
            };
    
            
            
            if(this.state.infinity == true) {
                if(this.state.currentSlide == this.state.children.length) {
                    // this.fullCarrousel.current.style.transition = '0s';
                    this.setState({currentSlide: 0});
                    setTimeout(() => {
                        this.fullCarrousel.current.style.transition = '0s';
                        this.setState({left: -this.state.slideWidth});
                        
                    }, 500);
                    // this.fullCarrousel.current.style.transition = '0.5s';
                } else if(this.state.currentSlide == -1) {
                    // this.fullCarrousel.current.style.transition = '0s';
                    setTimeout(() => {
                        this.fullCarrousel.current.style.transition = '0s';
                        this.setState({left: -(this.state.slideWidth * this.state.children.length)});
                    }, 500);
                    this.setState({currentSlide: this.state.children.length-1});
                }
            } else if(this.state.arrows) {
                if(side == 'left' || side == 'right') {
                    if(this.state.currentSlide == this.state.children.length-1) {
                        this.rightArrow.current.style.display = 'none';
                    } else if(this.state.currentSlide == 0) {
                        this.leftArrow.current.style.display = 'none';
                    } else {
                        this.rightArrow.current.style.display = 'initial';
                        this.leftArrow.current.style.display = 'initial';
                    }         
                } else {
                    if(side == this.state.children.length-1) {
                        this.rightArrow.current.style.display = 'none';
                    } else if(side == 0) {
                        this.leftArrow.current.style.display = 'none';
                    } else {
                        this.rightArrow.current.style.display = 'initial';
                        this.leftArrow.current.style.display = 'initial';
                    }
                }
            };
        }
    };

    componentDidMount() {
        console.log(this.props.children);
        console.log(this.props.children[0]);
        this.setState({carrousel: this.carrousel.current});
        this.setState({fullCarrousel: this.fullCarrousel.current});
        this.setState({slideWidth: this.carrousel.current.clientWidth});
        Array.from(this.fullCarrousel.current.childNodes).map((item, index) => {
            item.style.width = this.carrousel.current.clientWidth+'px';
        });
        this.setState({left: -this.carrousel.current.clientWidth});
        this.setState(this.props, () => {
            if(this.props.autoSlide && this.props.infinity) {
                let interval = setInterval(this.slideAnimation, this.state.speed);
                this.setState({interval: interval});
                if(this.props.speed) {
                    this.setState({speed: this.props.speed});
                } else {
                    this.setState({speed: 2000});
                }
            } 
            else {
                this.setState({speed: 500})
            }
        });
        this.carrousel.current.style.transition = '0.5s';
        console.log(this.rightArrow);
        console.log(this.rightArrow);
        window.addEventListener('resize', () => this.setState({slideWidth: this.carrousel.current.clientWidth}))
    }

    render() {
        const setas = (side) => {
            if(this.state.arrows) {
                return (
                    <div ref={this[side+'Arrow']} className={'arrow-carousel arrow-carousel-'+side} onClick={() => this.slideAnimation(side)}>{
                        side == 'right' ?
                        '>' :
                        '<'
                    }</div>
                )
            }
        };

        const dots = (length) => {
            if(this.state.dots) {
                let dots = [];
               for(let i = 0; i < length; i++) {
                dots.push(<div className={this.state.currentSlide == i ? 'dot-carousel selected' : 'dot-carousel'} 
                onClick={() => {
                    // console.log(this.state.slideWidth);
                    // console.log(this.state.slideWidth*(i+1));
                    this.slideAnimation(i);
                    // this.fullCarrousel.current.style.transition = '0.5s';
                    // this.setState({left: -(this.state.slideWidth * (i+1))});
                    // this.setState({currentSlide: i});
                }} ></div>)
               }
                return(
                    <div className='dots-carousel'>
                        {dots}
                    </div>
                )
            }
        };

        return (
            <div className='carousel' ref={this.carrousel} onMouseEnter={() => {
                clearInterval(this.state.interval);
                this.setState({speed: 500});
            }} onMouseLeave={() => {
                if(this.state.autoSlide && this.state.infinity) {
                    let interval = setInterval(this.slideAnimation, this.state.speed);
                    this.setState({interval: interval});
                    if(this.props.speed) {
                        this.setState({speed: this.props.speed});
                    } else {
                        this.setState({speed: 2000});
                    }
                };
            }}>
                    {setas('right')}
                    {setas('left')}
                <div className='full-carousel' ref={this.fullCarrousel} style={{
                    left: this.state.left
                }}>
                    {this.props.children[this.props.children.length-1]}
                    {this.props.children}
                    {this.props.children[0]}
                </div>
                {dots(this.props.children.length)}
            </div>
        )
    }
}
