// // svg dial code adapted from tutorial at
// // https://www.motiontricks.com/creating-dynamic-svg-elements-with-javascript/
// export const getBG = (date) => {
//     let agendaBG = []

//     let positions = 24; // hour count
//     let count = 0; // simple counter for the numbers
//     let minCount = 0;
//     let curY = 0; // vertical position tracker
//     let xStart = 48;
//     let xEnd; // end of each tick line
//     let spacing = 20; // space between lines
//     let hourLength = 25;
//     let halfHourLength = 20;
//     let otherLength = 15;
//     let hourLocX = 5;
//     let hourLocYOffset = 6;
//     let halfHourLocX = 5;
//     let halfHourLocYOffset = 6;

//     function makeClickBox() {
//         let opa = 0.1;
//         if (minCount % 10 == 0) {
//             opa = 0.2;
//         }
//         return (
//             <svg>
//                 <rect x={0} y={curY + 1} width={xStart} height={spacing} style={{fill:"rgb(25,85,40)", fillOpacity:"0.3"}} />
//                 <rect id={date + " " + String(count).padStart(2, '0') + ":" + String(minCount).padStart(2, '0')} x={0} y={curY + 1} width={1000} height={spacing} style={{fill:"rgb(25,85,40)", fillOpacity:opa}} />
//             </svg>
//         )
//     }

//     function makeLine(xLen) {
//         return (
//             <svg>
//                 <line x1={xStart} y1={curY} x2={xLen} y2={curY} style={{stroke:"rgb(255,0,0)", strokeWidth:"2"}} />
//             </svg>
//         )
//     }

//     function makeHourLabel() {
//         return (
//             <svg>
//                 <text x={hourLocX} y={curY + hourLocYOffset}>{String(count).padStart(2, '0')}:00</text>
//             </svg>
//         )
//     }

//     function makeHourHalfLabel() {
//         return (
//             <svg>
//                 <text x={halfHourLocX} y={curY + halfHourLocYOffset}>{String(count).padStart(2, '0')}:30</text>
//             </svg>
//         )
//     }

//     // make a pack of lines for each number
//     for (let j = 0; j < positions; j++) {
//         agendaBG.push(makeHourLabel());

//         for (let i = 0; i < 4; i++) {
//             agendaBG.push(makeClickBox());

//             if (i === 0) {
//                 xEnd = xStart + hourLength;
//             }
//             else if (i === 2) {
//                 xEnd = xStart + halfHourLength;
//                 agendaBG.push(makeHourHalfLabel());

//             }
//             else {
//                 xEnd = xStart + otherLength;
//             }
//             agendaBG.push(makeLine(xEnd));
//             curY += spacing;

//             minCount += 15;

//         }
//         count++;
//         minCount = 0;
//     }

//     count = 0;
//     agendaBG.push(makeHourLabel()); // one final number
//     agendaBG.push(makeLine(xStart+hourLength)); //  need 1 extra line for the last number

//     return (
//         agendaBG
//     )
// }
