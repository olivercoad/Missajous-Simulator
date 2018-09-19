function curve(decay = 150) {
    this.decay = decay;
    this.points = [];
    this.plot = function (point) {
        this.points.push(point);
        while (this.points.length > this.decay) {
            this.points.shift();
        }
    }

    this.setDecay = function (decay) {
        this.decay = decay;
    }

    this.draw = function () {
        //stroke(255);
        //noFill();
        
        let lastPoint = null;
        for(let i = 0; i < this.points.length; i++) {
            let e = this.points[i];
            if (lastPoint) {
                stroke(255, 0, 255, 255);
                let alpha = floor((i / this.decay) * 255);
                stroke(0, 0, 255, alpha);
                line(lastPoint.x, lastPoint.y, e.x, e.y);
            }

            lastPoint = e;
        }

   }
}