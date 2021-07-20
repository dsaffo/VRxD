export function pitch_trajectory(x,y,z,vx,vy,vz,ax,ay,az,dt) {
    let trajectory = [];



     trajectory.push( {
            t: 0,
            x: x,
            y: y, 
            z: z,
            vx: vx,
            vy: vy,
            vz: vz,
            ax: ax,
            ay: ay,
            az: az, 
        }
     );
   

    let ystart = 40;
    let tstart = (-vy - Math.sqrt(Math.pow(vy,2) - 2 * ay * (y - ystart))) / ay;
    let vxstart = vx + ax * tstart;
    let vystart = vy + ay * tstart;
    let vzstart = vz + az * tstart;
    let time = (-vystart - Math.sqrt(Math.pow(vystart,2) - 2 * ay * (ystart - 17/12))) / ay;
    let vxbar = (2 * vxstart + ax * time) / 2;
    let vybar = (2 * vystart + ay * time) / 2;
    let vzbar = (2 * vzstart + az * time) / 2;
    let vbar = Math.sqrt(Math.pow(vxbar,2) + Math.pow(vybar,2) + Math.pow(vzbar,2))
    let adrag = Math.abs(ax * vxbar + ay * vybar + (az + 32.179) * vzbar) / vbar;
    let amagx = ax + adrag * vxbar / vbar;
    let amagy = ay + adrag * vybar / vbar;
    let amagz = az + adrag * vzbar / vbar + 32.179;

    //console.log(tstart,vxstart,vystart,vzstart,time,vxbar,vybar,vzbar,vbar,adrag,amagx,amagy,amagz);



    
    for (let i = 0; trajectory[i]['y'] > 0; i++){
        
        console.log(trajectory[i]['x'], trajectory[i]['y'], trajectory[i]['z']);

        let newT = trajectory[i]['t'] + dt;
        let newX = trajectory[i]['x'] + trajectory[i]['vx'] * dt + 0.5 * trajectory[i]['ax'] * Math.pow(dt, 2);
        let newY = trajectory[i]['y'] + trajectory[i]['vy'] * dt + 0.5 * trajectory[i]['ay'] * Math.pow(dt, 2); 
        let newZ = trajectory[i]['z'] + trajectory[i]['vz'] * dt + 0.5 * trajectory[i]['az'] * Math.pow(dt, 2);


        //Model that accounts for drag and magnus forces (not working right)

        

        //Constant acceleration + velocity model not realistic but will have to work for now
        
        let newAx = ax;
        let newAy = ay;
        let newAz = az;
        let newVx = trajectory[i]['vx'] + newAx * dt;
        let newVy = vy;
        let newVz = trajectory[i]['vz'] + newAz * dt;
        

        trajectory.push({
            t: newT,
            x: newX,
            y: newY,
            z: newZ,
            vx: newVx,
            vy: newVy,
            vz: newVz,
            ax: newAx,
            ay: newAy,
            az: newAz, 
        }
        )
    }
    

    return trajectory;
}

