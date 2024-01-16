// ! - BUG LOOKOUT
// ? - timezone issues
// ? - data entry issues
// ? - timedate locale bug
// ? - task table misaligns itself on page change/return

// ! - CHOPPING BLOCK

// ! - Agenda Work
// * TODO- finish agenda alpha
// ? - fiNALIZE AGENDA RESPONSIVE SIZING

// ! - Daily Task Work
// * TODO- finish daily task alpha

// ! - Daily Habit Work
// * TODO- finish daily habit alpha

// DAILY HABIT CONCEPT //
// Do ACTION every x DAYS
// OR specific days of the week
// "ripen" color of goal as x amount of days passes
// colors become calamitous if more than x days is passed
// after completing, goal is grayed out into 'cooldown' period
// ie. until next day, two weeks for a monthly task, etc
// successful streaks are tracked with cute flame graphic or something

// progress bar? for goals?
// add progress bar to main goal screen
// select a given habit and add a specific goal streak to track
// ie. "read book ever 30 days" tracked, becomes "read a book every month this year 1/12"
// TODO- edit database to accomodate new system
// (if you need to at all, FREQ/PERIOD probably works perfect for this)

// TODO- habit creation window close on accept
// TODO- habit creation window close on outside click
// TODO- habit edit window close on accept
// TODO- habit edit window close on outside click
// TODO- modernize habit creation window style
// TODO- modernize habit edit window style
// TODO- add streak graphic
// TODO- add cooldown/ripening logic
// // TODO- figure out tracking system
// // TODO- go away? fade? while not due anytime soon
// // TODO- figure elegant use of period/frequency system

// * TODO- make pretty
// TODO- fix checkbox items colors/aesthetic

// TODO- make jump button look better
// TODO- make PERFECTLY SMOOTH - passive listeners, optimistic updates, loading indicators, etc
// TODO- properly design TASK/HABIT boxes, checkboxes
// TODO- properly design attractive Calendar Events
// TODO- properly design an attractive calendar background
// TODO- prettify (+) buttons
// TODO- popup boxes
// TODO- add textures
// TODO- confirm colors
// TODO- add loading indicators
// TODO- properly align checkboxes
// TODO- add WIP notes to other tabs

// * TODO- package and place on resume, github

// * TODO- create other pages

// * TODO- massive tidy 1

// * TODO- finish DAY View
// ? TODO- maybe create a pure day calendar view (useful for navigating to from weeks view, etc) (no daily checks)

// * TODO- massive tidy 2

// * TODO- finish WEEK View
// TODO- shows every day for this week at a glance
// like a collection of scrollbar representations
// TODO- show themes for the week // weekly mediations
// TODO- show weekly goals // weekly tasks
// TODO- highlight important events // things due this week
// TODO- preview whats coming next week

// * TODO- massive tidy 3

// * TODO- finish MONTH View
// TODO- shows a collection of days and the weeks in the month
// like a traditional calendar month view
// but even more with scrollbar representations
// inspired by that pixel journaling app
// TODO- show themes for the month // monthly meditations
// TODO- show monthly goals // monthly tasks
// TODO- highlight important events // things due this month
// TODO- preview whats coming next month

// * TODO- massive tidy 4

// * TODO- finish YEAR View
// TODO- shows a collection of days, weeks, months in year
// like a traditional calendar year view
// but even more with scrollbar representations
// inspired by that pixel journaling app
// TODO- show themes for the year // yearly meditations // goals
// TODO- yearly tasks // aspirations
// TODO- highlight important events // things due this year
// TODO- bigger focus on charts/metrics/reflection/improvement

// * TODO- massive tidy 5

// * TODO- finish TASKS View
// TODO- all past and future tasks
// TODO- division of completed and incomplete
// TODO- show stats

// * TODO- massive tidy 6

// * TODO- finish HABITS View
// TODO- show habits
// TODO- bigger focus on stats

// * TODO- massive tidy 7

// ! - TEST LIST
// * TODO- event sidepanel
// * TODO- event main panel

// * TODO- event creation
// * TODO- event edit

// * TODO- task creation
// * TODO- task edit

// * TODO- habit creation
// * TODO- habit edit

// * TODO- multiple size testing

// ! - random issues
// TODO- create UML diagram of database
// TODO- make popup dialogues autoclose on confirm
// TODO- make tasks/habits smoothly autosort on completion
// TODO- an all day event spanning multiple days wont show up properly (preview or main)

// ! - stretch goals
// TODO- add habit categories??
// TODO- turn color schemes into constants (priority colors, category colors, theme colors)
// TODO- look into optimistic updates
// * TODO- add optimistic updates?
// TODO- for deleting events
// TODO- for creating events
// TODO- for editing events/whatever
// ? TODO- add event tooltips on agenda event hover
// ? TODO- add event notes in agenda event body graphic
// ? TODO- add event length in agenda event body graphic
// ? TODO- add way to generate//delete repeated events
// // TODO- add scroll preview
// TODO- polish scroll preview
// TODO- add scroll preview draggable/selectable
// TODO- add ability to link todos/habits with events
// TODO- add sick color palette
// TODO- title app 'YAR-OH'?
// TODO- give candy/skeleton/sardine/pastel/retro computing/gothic lolita aesthetic to graphics
// TODO- checkboxes
// TODO- event bubbles
// TODO- buttons
// TODO- slider + slider event representations
// TODO- make fully responsive
// ?- add infinite scroll (sorta added, could be better)
// * TODO- add dayStart metric page
// TODO- daily stats
// TODO- weather
// TODO- progress reports // stats // graphs
// TODO- motivational quotes // tarot cards // lenormand // daily fortune
// TODO- themes for the day
// TODO- recheck sketches

// ! - completed
// // TODO- make tasks a fixed height/no word wrap
// // TODO- convert create task window to new style
// // TODO- convert edit task window to new style
// // TODO- task window close on accept
// // TODO- add task priority side bar color
// // TODO- sort task by priority -> date due
// // TODO- place completed tasks on bottom of list, remove after a day old
// // TODO- task window close on accept
// // TODO- maybe divide up tasks due today and otherwise
// // ? I mean, tasks will always only ever be [PASTDUE, DUESOON, NOTDUESOON, COMPLETE]
// // TODO- recently completed remain
// // ? Maybe purge every day
// // ? TODO- maybe divide up tasks due today and otherwise
// // TODO- add system to deal with overlapping events
// // TODO- add event categories/colors
// // TODO- different text colors for different category colors
// // TODO- add title to event creation/edit
// // TODO- add color/category to preview pane
// // TODO- enable error message on event create/edit
// // TODO- prevent automatic close on event create/edit error
// // TODO- standardize components
// // TODO- standardize/correct css
// // TODO- tidy old comments
// // TODO- audit # of database calls
// // TODO- add basic time validation Start must PRECEDE end (maybe add to backend)
// // TODO- add YESTERDAY & TOMORROW nav buttons
// // TODO- add description validation
// // TODO- validate start time is before end time
// // TODO- validate < 15min events
// // TODO- add color/category
// // TODO- add working eventLength
// // * TODO- event creation windows
// // TODO- event window close on accept
// // * TODO- event validate for description
// // TODO- add description validation
// // TODO- validate start time is before end time
// // TODO- add color/category
// // TODO- standardize/lockdown scroll preview width
// // TODO- set up redux - seems not worth it for the size of the app, wont improve performance
// // TODO- remove auto scroll to current time on day update
// // TODO- add auto winow close on confirmation/update
// // * TODO- fix TOO MANY CONNECTIONS DB ISSUE
// // TODO- rename dayview components to be less confusing
// // TODO- stylize habits to be more inline with tasks
// // TODO- make scroll listener a passive listener
// // TODO- ensure checkboxes work well
// // ! TODO- simplify day view
// // TODO- remove infinite scroll (simplify agendaDetail)
// // TODO- add proper next/last day buttons
// // TODO- create *new task* button (floating button on bottom?)
// // TODO- edit/delete task on selection (bootstrap popup window?)
// // TODO- use box to mark complete
// // TODO- cross out once complete
// // TODO- make habit objects
// // TODO- unpack habit array
// // TODO- make task objects
// // TODO- unpack task array
// // TODO- create scrollable agenda default
// // TODO- populate with agenda objects
// // TODO- remove old comments
// // TODO- remove errors
// // TODO- find more reliable alternative to SVG drawing
// // TODO- add a 'currentTime' flag
// // TODO- remove dead-end files
// // TODO- add a 'jump to current time button'
// // TODO- finish db call tutorial -> update cache when necessary, etc
// // TODO- create *new habit* button (floating button on bottom?)
// // TODO- edit/delete habit on selection (bootstrap popup window?)
// // TODO- fix datetime formatting for 'placeholder' in EDIT
// // TODO- fix datetime formatting for submission in EDIT
// // TODO- click on agenda to create event starting at that time (a la google cal)
// // TODO- click on agenda event to see details/ delete/ edit
// // TODO- add current time tracker
// // * TODO- make things not so FUCKING slow
// // * TODO- wire up top nav buttons
// // * TODO- ffind oh why god why console log in backend
// // TODO- only show the current days events
// // scrollback into yesterday/ scroll into tomorrow

// * OLDER VERSION OF APP MODULE
// import logo from './logo.svg';
// export default function App() {
//   return (
//     <div className='App'>
//       <div className="navBarContainer">
//         <header className="navBar">
//             <div className="logo"/>
//             <div className='navButton'>
//               <div> "HABITS" </div>
//             </div>
//             <div className='navButton'>
//               <div> "TASKS" </div>
//             </div>
//             <div className='navButton'>
//               <div> "YEAR" </div>
//             </div>
//             <div className='navButton'>
//               <div> "MONTH" </div>
//             </div>
//             <div className='navButton'>
//               <div> "WEEK" </div>
//             </div>
//             <div className='navButton'>
//               <div> "TODAY" </div>
//             </div>
//         </header>
//       </div>
//       <div>
//         <div className='meatContainer'>
//             <div className='habitDaily'>
//               <div>
//                 <div> "HABITS" </div>
//               </div>
//               {/* <HabitList/> */}
//             </div>
//             <div className='taskDaily'>
//               <div>
//                 <div> "TASKS" </div>
//               </div>
//               {/* <TaskList/> */}
//             </div>
//             <div className='agenda'>
//               <div className='agendaFar'>
//                 {/* <AgendaSummary/> */}
//               </div>
//               <div className='agendaClose'>
//                 {/* <Agenda/> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//      );
// }

// * ANOTHER OLD VERSION OF APP MODULE
// import { setStatusBarNetworkActivityIndicatorVisible, StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, div } from 'react-native';
// import Agenda from './Agenda';
// import AgendaSummary from './AgendaSummary';
// import TaskList from './TaskList';
// import HabitList from './HabitList';

// export default function App() {
//   return (
//     <div style={styles.container}>
//       <div style={[styles.navBar, {backgroundColor: '#E3E3D9' }]} >

//         <div style={[styles.logo, {backgroundColor: 'gray'}]} />

//         <div style={[styles.button, {backgroundColor: '#bab5a1'}]}>
//           <div style={[styles.textbutton]}> "HABITS" </div>
//         </div>

//         <div style={[styles.button, {backgroundColor: '#bab5a1'}]}>
//          <div style={[styles.textbutton]}> "TASKS" </div>
//         </div>

//         <div style={[styles.button, {backgroundColor: '#bab5a1'}]}>
//           <div style={[styles.textbutton]}> "YEAR" </div>
//         </div>

//         <div style={[styles.button, {backgroundColor: '#bab5a1'}]}>
//           <div style={[styles.textbutton]}> "MONTH" </div>
//         </div>

//         <div style={[styles.button, {backgroundColor: '#bab5a1'}]}>
//           <div style={[styles.textbutton]}> "WEEK" </div>
//         </div>

//         <div style={[styles.button, {backgroundColor: '#454138'}]}>
//           <div style={[styles.textbutton, {color: '#dcd8c0'}]}> "TODAY" </div>
//         </div>
//       </div>

//       <div style={[styles.main, {backgroundColor: '#E3E3D9' }]} >
//         <div style={[styles.vegi, {backgroundColor: '#E3E3D9' }]}>
//           <div style={[styles.vegiHeader, {backgroundColor: 'lightpink'}]}>
//             <div style={[styles.textbutton]}> "HABITS" </div>
//           </div>
//           {/* <HabitList/> */}
//         </div>

//         <div style={[styles.vegi, {backgroundColor: '#E3E3D9' }]}>
//           <div style={[styles.vegiHeader, {backgroundColor: 'lightcoral'}]}>
//             <div style={[styles.textbutton]}> "TASKS" </div>
//           </div>
//           {/* <TaskList/> */}
//         </div>

//         <div style={[styles.scroll, {backgroundColor: '#E3E3D9' }]}>
//           {/* <AgendaSummary/> */}
//         </div>

//         <div style={[styles.meat, {backgroundColor: '#E3E3D9' }]}>
//           {/* <Agenda/> */}
//         </div>

//       </div>

//       <div style={[styles.footer, {backgroundColor: '#E3E3D9' }]} />

//       {/* <StatusBar style="auto" /> */}
//     </div>
//   );
// }

// * OLD APP MODULE CSS
// .Agenda {
//     background-Color: #54d6d0;
//     color: #454138;
//     flex: content;
//     border-radius: 6px;
//     margin: 1%;
//     text-align: center;
//     padding-top: 1%;
//     padding-bottom: 1%;
//   }
//   .AgendaClose {
//     background-Color: #bab5a1;
//     color: #454138;
//     border-radius: 6px;
//     margin: 1%;
//     padding-top: 1%;
//     padding-bottom: 1%;
//   }
//   .AgendaFar {
//     background-Color: #bab5a1;
//     color: #454138;
//     border-radius: 6px;
//     margin: 1%;
//     padding-top: 1%;
//     padding-bottom: 1%;
//   }
//   .App-header {
//     background-color: #282c34;
//     min-height: 100vh;
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     font-size: calc(10px + 2vmin);
//     color: white;
//   }
//   .App-link {
//     color: #61dafb;
//   }
//   .App-logo {
//     height: 40vmin;
//     pointer-events: none;
//   }
//   .HabitDaily {
//     background-Color: #836f20;
//     color: #454138;
//     flex: content;
//     border-radius: 6px;
//     margin: 1%;
//     text-align: center;
//     padding-top: 1%;
//     padding-bottom: 1%;
//   }
//   .MeatContainer {
//     background-Color: #bab5a1;
//     height: 100vh;
//     flex: content;
//     display: flex;
//     flex-direction: row;
//     flex-basis: auto;
//     color: #454138;
//     display: flex;
//     border-radius: 6px;
//     margin: 1%;
//     text-align: center;
//     padding-top: 1%;
//     padding-bottom: 1%;
//     max-height: 90%;
//     height: 82vh;
//   }
//   .NavBar {
//     background-Color: #5c4c0e;
//     display: flex;
//     flex-direction: row;
//     border-radius: 6px;
//     width: 98%;
//     margin: auto;
//   }
//   .NavButton {
//     background-Color: #bab5a1;
//     color: #454138;
//     flex: content;
//     border-radius: 6px;
//     margin: 1%;
//     text-align: center;
//     padding-top: 1%;
//     padding-bottom: 1%;
//   }
//   .TaskDaily {
//     background-Color: #62a34f;
//     color: #454138;
//     flex: content;
//     border-radius: 6px;
//     margin: 1%;
//     text-align: center;
//     padding-top: 1%;
//     padding-bottom: 1%;
//   }

//   @keyframes App-logo-spin {
//     from {
//       transform: rotate(0deg);
//     }
//     to {
//       transform: rotate(360deg);
//     }
//   }

//   @media (prefers-reduced-motion: no-preference) {
//     .App-logo {
//       animation: App-logo-spin infinite 20s linear;
//     }
//   }

// * OLDER VERSION OF AGENDAFAR MODULE
// import React, { useState, useCallback, useEffect, useRef } from "react";

// const SCROLL_BOX_MIN_HEIGHT = 20;

// export default function AgendaFar({ children, className, ...restProps }) {
//   const [hovering, setHovering] = useState(false);
//   const [scrollBoxHeight, setScrollBoxHeight] = useState(SCROLL_BOX_MIN_HEIGHT);
//   const [scrollBoxTop, setScrollBoxTop] = useState(0);
//   const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
//   const [isDragging, setDragging] = useState(false);

//   const handleMouseOver = useCallback(() => {
//     !hovering && setHovering(true);
//   }, [hovering]);

//   const handleMouseOut = useCallback(() => {
//     !!hovering && setHovering(false);
//   }, [hovering]);

//   const handleDocumentMouseUp = useCallback(
//     e => {
//       if (isDragging) {
//         e.preventDefault();
//         setDragging(false);
//       }
//     },
//     [isDragging]
//   );

//   const handleDocumentMouseMove = useCallback(
//     e => {
//       if (isDragging) {
//         e.preventDefault();
//         e.stopPropagation();
//         const scrollHostElement = scrollHostRef.current;
//         const { scrollHeight, offsetHeight } = scrollHostElement;

//         let deltaY = e.clientY - lastScrollThumbPosition;
//         let percentage = deltaY * (scrollHeight / offsetHeight);

//         setScrollThumbPosition(e.clientY);
//         setScrollBoxTop(
//           Math.min(
//             Math.max(0, scrollBoxTop + deltaY),
//             offsetHeight - scrollBoxHeight
//           )
//         );
//         scrollHostElement.scrollTop = Math.min(
//           scrollHostElement.scrollTop + percentage,
//           scrollHeight - offsetHeight
//         );
//       }
//     },
//     [isDragging, lastScrollThumbPosition, scrollBoxHeight, scrollBoxTop]
//   );

//   const handleScrollThumbMouseDown = useCallback(e => {
//     e.preventDefault();
//     e.stopPropagation();
//     setScrollThumbPosition(e.clientY);
//     setDragging(true);
//     console.log("handleScrollThumbMouseDown");
//   }, []);

//   const handleScroll = useCallback(() => {
//     if (!scrollHostRef) {
//       return;
//     }
//     const scrollHostElement = scrollHostRef.current;
//     const { scrollTop, scrollHeight, offsetHeight } = scrollHostElement;

//     let newTop =
//       (parseInt(scrollTop, 10) / parseInt(scrollHeight, 10)) * offsetHeight;
//     // newTop = newTop + parseInt(scrollTop, 10);
//     newTop = Math.min(newTop, offsetHeight - scrollBoxHeight);
//     setScrollBoxTop(newTop);
//   }, []);

//   const scrollHostRef = useRef();

//   useEffect(() => {
//     const scrollHostElement = scrollHostRef.current;
//     const { clientHeight, scrollHeight } = scrollHostElement;
//     const scrollThumbPercentage = clientHeight / scrollHeight;
//     const scrollThumbHeight = Math.max(
//       scrollThumbPercentage * clientHeight,
//       SCROLL_BOX_MIN_HEIGHT
//     );
//     setScrollBoxHeight(scrollThumbHeight);
//     scrollHostElement.addEventListener("scroll", handleScroll, true);
//     return function cleanup() {
//       scrollHostElement.removeEventListener("scroll", handleScroll, true);
//     };
//   }, []);

//   useEffect(() => {
//     //this is handle the dragging on scroll-thumb
//     document.addEventListener("mousemove", handleDocumentMouseMove);
//     document.addEventListener("mouseup", handleDocumentMouseUp);
//     document.addEventListener("mouseleave", handleDocumentMouseUp);
//     return function cleanup() {
//       document.removeEventListener("mousemove", handleDocumentMouseMove);
//       document.removeEventListener("mouseup", handleDocumentMouseUp);
//       document.removeEventListener("mouseleave", handleDocumentMouseUp);
//     };
//   }, [handleDocumentMouseMove, handleDocumentMouseUp]);

//   return (
//     <div
//       className={"scrollhost-container"}
//       onMouseOver={handleMouseOver}
//       onMouseOut={handleMouseOut}
//     >
//       <div
//         ref={scrollHostRef}
//         className={`scrollhost ${className}`}
//         {...restProps}
//       >
//         {children}
//       </div>
//       <div className={"scroll-bar"} style={{ opacity: hovering ? 1 : 0 }}>
//         <div
//           className={"scroll-thumb"}
//           style={{ height: scrollBoxHeight, top: scrollBoxTop }}
//           onMouseDown={handleScrollThumbMouseDown}
//         />
//       </div>
//     </div>
//   );
// }

// { /* <svg viewBox="0 0 1000 1430" style={{zIndex: '50', position: 'absolute'}}> */ }

// { /* {hourArr.map(e =>{
//   return (
//     <rect x="150" y={e} rx='10' width="640" height="3" />
//   );
// })} */ }
// { /* {eventTimes.map((start, index) =>{
//   console.log(eventTimes);
//   var eventLength = eventLengths[index];
//   return (
//     <rect x="150" y={start*248.84} rx='10' width="640" height={eventLength*248.84} fill-opacity="50%"/>
//   ); */ }

// { /* <rect x="0" y="10" width="20%" height="5" /> */ }
// { /* <g stroke="black" fill="red" strokeWidth="2">
//     <path d="M539,1 L1,1 L1,329 L463,329 L493,300 L539,300 Z" />
//   </g> */ }
// { /* </svg> */ }
