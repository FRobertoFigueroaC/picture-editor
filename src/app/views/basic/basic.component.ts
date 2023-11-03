import { Component, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})


export class BasicComponent implements OnInit, AfterViewInit {

  public  defaultImg = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

  // public  defaultImg = '../../../assets/images/test1.jpg'

  @ViewChild('canvas') canvas: ElementRef = {} as ElementRef;
  @ViewChild('infoPoints') infoPoints: ElementRef = {} as ElementRef;

  // private canvas: ElementRef = {} as ElementRef;
  // private infoPoints: ElementRef = {} as ElementRef;

  public context: CanvasRenderingContext2D | undefined = undefined;

  public clickPoints: any[] = [];

  public image = new Image();

  public biggest = 500;

  constructor() { }

  ngOnInit(): void {
  }

  
  ngAfterViewInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d'); 
    this.setImage(this.defaultImg);
  }

  // canvas EventListeners
  onClickCanvas(event:any) {
    this.clickPoints.push([event.offsetX, event.offsetY])
    this.drawDot(event.offsetX, event.offsetY)
    this.infoPoints.nativeElement.textContent = this.clickPoints.join(" : ")
    if (this.clickPoints.length >= 4) this.drawPoly(this.clickPoints)
  }

  drawPoly(points:any) {
    this.context!.lineWidth = 2
    this.context?.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height)
    let split = points.splice(0, 4)
    
    this.context?.beginPath()
    this.context?.moveTo(split[0][0], split[0][1])
    for(let i of split.reverse()) {
      this.context?.lineTo(i[0], i[1])
    }
    this.context?.stroke()
  }
  drawDot(x:any,y:any) {
    this.context?.beginPath();
    this.context?.arc(x, y, 2, 0, 2*Math.PI);
    this.context?.fill();
  }

  resize(x:any,y:any) {
    console.log('height img', x);
    console.log('width img', y);
    
    // so that the biggest axis is always {biggest} px
    let ratio = x > y ? x / this.biggest : y / this.biggest;
    console.log('ratio', ratio);
    
    const axis = [x / ratio, y / ratio];
    console.log('axis', axis);
    
    this.canvas.nativeElement.height = axis[0]
    this.canvas.nativeElement.width = axis[1]
    this.context?.drawImage(this.image,0,0,axis[0],axis[1]); 
  }

  // helpers
  setImage(src: any) {
    this.image.src = src
    this.image.onload = () => {
      // this.canvas.nativeElement.style.backgroundImage = "url(" + src + ")"
      this.resize(this.image.height, this.image.width);
    };
  }
  

}
