import { Component, OnInit, ViewChild,ElementRef, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-rectangle',
  templateUrl: './rectangle.component.html',
  styleUrls: ['./rectangle.component.css']
})
export class RectangleComponent implements OnInit, AfterViewInit {

  // public  defaultImg = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

  public  defaultImg = '../../../assets/images/test1.jpg'


  // @ViewChild('canvas') canvas:HTMLCanvasElement = {} as HTMLCanvasElement;
  @ViewChild('canvas') canvas:ElementRef = {} as ElementRef;
  @ViewChild('infoPoints') infoPoints: ElementRef = {} as ElementRef;

  public context: CanvasRenderingContext2D | undefined = undefined;
  // image instance for canvas background
  public image = new Image();
  //save temporal coordinates to draw a rectangle
  public clickPoints: any[] = [];
  // mouse state
  public mouseDown = false;
  // canvas size
  public width = 1200;
  public height = 900;
  public axis: number[]= [];

  // global state for canvas figures
  public figures:any[] = []


  constructor() { }

  ngOnInit(): void {
    console.log(this.clickPoints);
    
  }

  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d'); 
    this.setImage(this.defaultImg);
  }

  drawRectangle() {
    this.context?.beginPath();
    this.context?.rect(this.clickPoints[0].x, this.clickPoints[0].y, this.clickPoints[1].x-this.clickPoints[0].x, this.clickPoints[1].y-this.clickPoints[0].y);
    this.context!.fillStyle = 'rgba(100,100,100,0.5)';
    this.context?.fill();
    this.context!.strokeStyle = "#df4b26";
    this.context!.lineWidth = 1;
    this.context?.stroke();
  }

  drawPoints() {
    this.context!.strokeStyle = "#df4b26"; 
    this.context!.lineJoin = "round"; 
    this.context!.lineWidth = 5; 
                
    for(let i=0; i < this.clickPoints.length; i++){ 
      this.context?.beginPath(); 
      this.context?.arc(this.clickPoints[i].x, this.clickPoints[i].y, 3, 0, 2 * Math.PI, false); 
      this.context!.fillStyle = '#ffffff'; 
      // this.context?.fill(); 
      this.context!.lineWidth = 5; 
      this.context?.stroke(); 
    }
  }

  redraw() {
    this.canvas.nativeElement.width = this.axis[0]; // Clears the canvas 
    // this.context?.drawImage(this.image,0,0); 
    this.context?.drawImage(this.image,0,0,this.axis[0],this.axis[1]); 
    
    this.drawRectangle();
    this.drawPoints();
  }

  onMouseDownCanvas(event:any) {
    this.clickPoints[0] = {
      x: event.offsetX,
      y: event.offsetY
    };
    this.mouseDown = true;
  }
  onMouseMoveCanvas (event:any) {
    if (this.mouseDown) {
      this.clickPoints[1] = {
        x: event.offsetX,
        y: event.offsetY
      };
      this.redraw();
    }
  }
  onMouseUpCanvas(event:any) {
    this.mouseDown = false;
    this.clickPoints[1] = {
      x: event.offsetX,
      y: event.offsetY
    };
  }
  onMouseLeaveCanvas(event:any) {
    this.mouseDown = false;
  }

  // helpers
  setImage(src: any) {
    this.image.src = src;
    this.image.onload = () => {
      // console.log('before canvas width', this.canvas.nativeElement.width);
      // console.log('before canvas height', this.canvas.nativeElement.height);
      
      // console.log('image width', this.image.width);
      // console.log('image height', this.image.height);
      
      // this.canvas.nativeElement.width = this.image.width;
      // this.canvas.nativeElement.height = this.image.height;
      
      // console.log('after canvas width', this.canvas.nativeElement.width);
      // console.log('after canvas height', this.canvas.nativeElement.height);

      const x = this.image.width;
      const y = this.image.height;

      let ratio =  x / 1200;

      this.axis = [x / ratio, y / ratio];

      this.canvas.nativeElement.width = this.axis[0]
      this.canvas.nativeElement.height = this.axis[1];
      
      this.context?.drawImage(this.image,0,0,this.axis[0],this.axis[1]); 
    };
  }

}
