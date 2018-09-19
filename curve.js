function curve(decay = 150) {
    this.points = [];
    this.plot = function(point) {
        this.points.push(point);
        if(this.points.length > decay) {
            this.points.shift();
        }
    }
    this.setDecay
    this.draw = function() {
//Apha bsed on index]
        let weight = 5;
        stroke(255);
        strokeCap(SQUARE);
        strokeWeight(weight);
        noFill();
        let falloff = floor(decay * 0.5);
        let lastPoint = null;
        this.points.forEach(function(e, i) {
            
            stroke(0, 200, 0, i/(falloff/255));
            if(i > falloff) {
                vertex(e.x, e.y);
            }
            else {
                if(i == falloff) {
                    beginShape();
                    vertex(e.x, e.y);
                }
                if(lastPoint) {

                    line(lastPoint.x, lastPoint.y, e.x, e.y);
                }
            }
            lastPoint = e;
        }, this);

        endShape(); //if not many points

        
    }
}