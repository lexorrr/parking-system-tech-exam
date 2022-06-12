import util from 'util';

class Parking {

    PARKING_SLOTS = 5;
    PARKING_DESCRIPTIONS = ['SP', 'MP', 'LP'];
    VEHICLE_DESCRIPTIONS = ['S', 'M', 'L'];
    ALPHABET = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    ENTRY_POINTS = 0;

    initParkingMap = (entryPoints) => {
        this.ENTRY_POINTS = parseInt(entryPoints);
        this.parkingMap = new Array(this.ENTRY_POINTS).fill(null).map( () => new Array(this.PARKING_SLOTS).fill(null) );
        if (entryPoints >= 3) {
            for (let i = 0; i < entryPoints; i++) {
                for (let j = 0; j < this.PARKING_SLOTS; j++) {
                    this.parkingMap[i][j] = (!this.isEntrance(j)) ? {
                        entryPoint: this.ALPHABET[i],
                        occupied: false,
                        parkingSize: this.getRandomParkingSize(),
                        distance: this.getRandomDistance(),
                        position: {
                            row: i,
                            col: j
                        }
                    } : null;
                }
            }

            this.sortParkingSlots();
        } else {
            console.log('Entry points must be minimum of 3.');
        }
    }

    sortParkingSlots() {
        /// Sort the parking slots by lowest distance
        for (let i = 0; i < this.ENTRY_POINTS; i++) {
            this.parkingMap[i].sort((a, b) => {
                if (a === null || b === null) {
                    return -1;
                }
                return a.distance - b.distance;
            });
        }

        // reassign positions (row, col)
        for (let i = 0; i < this.ENTRY_POINTS; i++) {
            for (let j = 0; j < this.PARKING_SLOTS; j++) {
                let parkingSlot = this.parkingMap[i][j];
                if (parkingSlot !== null) {
                    Object.assign(parkingSlot, {
                        position: {
                            row: i,
                            col: j
                        }
                    });
                }
            }
        }
    }

    unpark(row, col) {
        let parsedRow = parseInt(row);
        let parsedCol = parseInt(col);
        let p = this.parkingMap[parsedRow][parsedCol];
        let date = new Date();
        let totalPayable = 0;
        if (p.occupied) {
            /// For testing purposes
            // date.setDate(date.getDate() + 3);
            // console.log(`date: ${date}`);
            let diff = (date) - p.startDateTime;

            totalPayable = this.compute(p.parkingSize.size, diff);

            console.log(`Total payable: ${totalPayable}`);

            Object.assign(this.parkingMap[parsedRow][parsedCol], {
                occupied: false,
                vehicleSize: null,
                startDateTime: null
            });
        }

        return totalPayable;
    }

    park(entrance, vehicleSize) {
        console.log(`entrance: ${entrance}`);
        console.log(`vehicleSize: ${vehicleSize}`);
        let rowFound = -1;
        let colFound = -1;

        for (let i = 0; i < this.ENTRY_POINTS; i++) {
            for (let j = 0; j < this.PARKING_SLOTS; j++) {
                if (!this.isEntrance(j)) {
                    if (rowFound === -1) {
                        let parkingSlot = this.parkingMap[i][j];
                        if (parkingSlot.entryPoint === entrance &&
                            !parkingSlot.occupied) {

                            if (vehicleSize <= parkingSlot.parkingSize.size) {
                                rowFound = i;
                                colFound = j;
                            }
                        }
                    }
                }
            }
        }

        console.log(`rowFound: ${rowFound}`);
        console.log(`colFound: ${colFound}`);

        if (rowFound === -1) {
            console.log('No slot found');
            return;
        } else {
            Object.assign(this.parkingMap[rowFound][colFound], {
                occupied: true,
                vehicleSize: {
                    size: parseInt(vehicleSize),
                    desc: this.VEHICLE_DESCRIPTIONS[vehicleSize]
                },
                startDateTime: new Date()
            });
        }

        
    }

    getRandomParkingSize() {
        let size = Math.round(Math.random() * 2);
        let desc = this.PARKING_DESCRIPTIONS[size];

        return {
            size: size,
            desc: desc
        };
    }

    getRandomDistance() {
        let min = 1;
        let max = 30;
        return Math.round(Math.random() * (max - min) + min);
    }

    viewParkingMap() {
        console.log(util.inspect(this.parkingMap, {
            showHidden: false,
            colors: true,
            compact: true,
            depth: null
        }));
    }

    getParkingMap() {
        return this.parkingMap;
    }

    isEntrance(col) {
        return col === 0 || col === this.PARKING_SLOTS - 1;
    }

    compute(size, totalTime) {

        let remainingTime = totalTime;
        let t24 = 1000 * 60 * 24;
        let t1h = 1000 * 60;
        let charges = 0;
        
        let daysConsumed = Math.abs(remainingTime / 60 / 60 / 24 / 1000);

        var hourlyCharge = 0;

        if (size == 0) {
            hourlyCharge = 20;
        } else if (size == 1) {
            hourlyCharge = 60;
        } else if (size == 2) {
            hourlyCharge = 100;
        }

        if (remainingTime > t24) {
            let n24 = parseInt(totalTime / t24);
            charges = 5000 * daysConsumed;
            remainingTime -= (n24 * t24);
        }

        if (remainingTime > (t1h * 3)) {
            remainingTime -= (t1h * 3);
            charges += 40;
        }

        if (remainingTime > 0) {
            let remainingHours = Math.ceil (remainingTime / t1h);
            charges += remainingHours * hourlyCharge;
        }

        // return total charges
        return charges;

    }

}

export default Parking;