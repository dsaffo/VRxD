export function pitch_trajectory(x,y,z,vx,vy,vz,ax,ay,az,spin,dt) {

    let trajectory = [];

     trajectory.push( {
            t: 0,
            x: x,
            y: y, 
            z: z,
            vx: vx,
            vy: vy,
            vz: vz,
        }
     );

    //spin component calculations 
    let constant = 0.005368

    //mean velocity components
    let vyf = Math.sqrt(Math.pow(vy,2) - 2 * ay * (y - 0.432));
    let time = (vyf - vy) / ay; 
    let vxbar = (2 * vx + ax * time) / 2;
    let vybar = (2 * vy + ay * time) / 2;
    let vzbar = (2 * vz + az * time) / 2;
    let vbar = Math.sqrt(Math.pow(vxbar,2) + Math.pow(vybar,2) + Math.pow(vzbar,2))

    //drag acceleration
    let adrag = -(ax * vxbar + ay * vybar + (az + 9.8) * vzbar) / vbar;

    //drag coeff
    let Cd = adrag / (constant * Math.pow(vbar, 2));

    //Magnus force components 
    let amagx = ax + adrag * vxbar / vbar;
    let amagy = ay + adrag * vybar / vbar;
    let amagz = az + adrag * vzbar / vbar + 9.8;
    let amag = Math.sqrt(Math.pow(amagx,2) + Math.pow(amagy,2) + Math.pow(amagz,2));

    //lift coeff
    let Cl = amag / (constant *  Math.pow(vbar, 2));

    //direction cosines of spin
    let wx = (vybar * amagz  - vzbar * amagy) / (vbar * amag);
    let wy = (vzbar * amagx - vxbar * amagz) / (vbar * amag);
    let wz = (vxbar * amagy - vybar * amagx) / (vbar * amag);

    //spin rate in rad/s
    let omega = spin * 0.105
    
    //Calculate the poistion of the ball ever dt seconds 
    for (let i = 0; trajectory[i]['y'] > 0; i++){

        //curent point along the pitch trajectory
        let point = trajectory[i];
        
        
        //console.log(point.x * 3.2808, point.y * 3.2808, point.z * 3.2808);

        //velocity
        let V = Math.sqrt(Math.pow(point.vx,2) + Math.pow(point.vy,2) + Math.pow(point.vz,2))

        //drag
        let adragx2 = -constant * Cd * V * point.vx;
        let adragy2 = -constant * Cd * V * point.vy;
        let adragz2 = -constant * Cd * V * point.vz;

        //Magnus
        let amagx2 = constant * (Cl / omega) * V * (wy * point.vz - wz * point.vy);
        let amagy2 = constant * (Cl / omega) * V * (wz * point.vx - wx * point.vz);
        let amagz2 = constant * (Cl / omega) * V * (wx * point.vy - wy * point.vx);

        //acceleration
        let ax2 = adragx2 + amagx2
        let ay2 = adragy2 + amagy2
        let az2 = adragz2 + amagz2

        //ball position
        let newT = point.t + dt;
        let newX = point.x + point.vx * dt + 0.5 * ax2 * Math.pow(dt, 2);
        let newY = point.y + point.vy * dt + 0.5 * ay2 * Math.pow(dt, 2);
        let newZ = point.z + point.vz * dt + 0.5 * az2 * Math.pow(dt, 2);

        //new directional velocity
        let newVx = point.vx + ax * dt;
        let newVy = point.vy + az * dt;
        let newVz = point.vz + az * dt;

        trajectory.push({
            t: newT,
            x: newX,
            y: newY,
            z: newZ,
            vx: newVx,
            vy: newVy,
            vz: newVz,
        });

        /*
        Constant acceleration + velocity model not realistic as doesnt account for spin

        let newT = trajectory[i]['t'] + dt;
        let newX = trajectory[i]['x'] + trajectory[i]['vx'] * dt + 0.5 * trajectory[i]['ax'] * Math.pow(dt, 2);
        let newY = trajectory[i]['y'] + trajectory[i]['vy'] * dt + 0.5 * trajectory[i]['ay'] * Math.pow(dt, 2); 
        let newZ = trajectory[i]['z'] + trajectory[i]['vz'] * dt + 0.5 * trajectory[i]['az'] * Math.pow(dt, 2);

        
        
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
        });
            */
    }
    

    return trajectory;
}

