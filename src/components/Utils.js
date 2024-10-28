import Mascot1 from "../images/Mascots/mascot1.png";
import Mascot2 from "../images/Mascots/mascot2.png";
import Mascot3 from "../images/Mascots/mascot3.png";
import Mascot4 from "../images/Mascots/mascot4.png";
import Mascot5 from "../images/Mascots/mascot5.png";
import Mascot6 from "../images/Mascots/mascot6.png";
import Mascot7 from "../images/Mascots/mascot7.png";
import Mascot8 from "../images/Mascots/mascot8.png";
import Mascot9 from "../images/Mascots/mascot9.png";
import Mascot10 from "../images/Mascots/mascot10.png";
import Mascot11 from "../images/Mascots/mascot11.png";
import Mascot12 from "../images/Mascots/mascot12.png";
import Mascot13 from "../images/Mascots/mascot13.png";
import Mascot14 from "../images/Mascots/mascot14.png";
import Mascot15 from "../images/Mascots/mascot15.png";
import Mascot16 from "../images/Mascots/mascot16.png";
import Mascot17 from "../images/Mascots/mascot17.png";
import Mascot18 from "../images/Mascots/mascot18.png";
import Mascot19 from "../images/Mascots/mascot19.png";
import Mascot20 from "../images/Mascots/mascot20.png";
import Mascot21 from "../images/Mascots/mascot21.png";
import Mascot22 from "../images/Mascots/mascot22.png";
import Mascot23 from "../images/Mascots/mascot23.png";
import Mascot24 from "../images/Mascots/mascot24.png";
import BlankImage from "../images/Mascots/blank-image.PNG";
import Badge1 from "../images/Rewards/orange.png";
import Badge2 from "../images/Rewards/head-scarf.png";
import Badge3 from "../images/Rewards/sky.png";
import Badge4 from "../images/Rewards/mouth.png";
import Badge5 from "../images/Rewards/cat.png";
import Badge6 from "../images/Rewards/croissant.png";
import Badge7 from "../images/Rewards/red-hair.png";
import Badge8 from "../images/Rewards/mountains.png";
import Badge9 from "../images/Rewards/bag.png";
import Badge10 from "../images/Rewards/bear.png";
import Badge11 from "../images/Rewards/cake.png";
import Badge12 from "../images/Rewards/old-man.png";
import Badge13 from "../images/Rewards/egg.png";
import Badge14 from "../images/Rewards/heart.png";
import Badge15 from "../images/Rewards/fingers-crossed.png";
import Badge16 from "../images/Rewards/avocado.png";
import Badge17 from "../images/Rewards/black-hat.png";
import Badge18 from "../images/Rewards/globe.png";
import Badge19 from "../images/Rewards/glasses.png";
import Badge20 from "../images/Rewards/milk.png";
import Badge21 from "../images/Rewards/strawberry.png";
import Badge22 from "../images/Rewards/helmet-man.png";
import Badge23 from "../images/Rewards/coffee.png";
import Badge24 from "../images/Rewards/love-letter.png";
import Badge25 from "../images/Rewards/calculator-badge.png";
import Badge26 from "../images/Rewards/TiktokBadge.png";
import Badge27 from "../images/Rewards/FortniteBadge.png";
import Badge28 from "../images/Rewards/legoBadge.png";
import Badge29 from "../images/Rewards/FodboldBadge.png";
import Badge30 from "../images/Rewards/RobloxBadge.png";
import Badge31 from "../images/Rewards/SodedyrBadge.png";
import Teacher from "../images/Teacher/teacher.png";
import Swal from "sweetalert2";

/*Returns a mascot image based on the index of the mascot in the mascot array 
retrieved from the database*/
export const getMascotImage = (index) => {
  switch (index) {
    case 0: {
      return Mascot1;
    }
    case 1: {
      return Mascot2;
    }
    case 2: {
      return Mascot3;
    }
    case 3: {
      return Mascot4;
    }
    case 4: {
      return Mascot5;
    }
    case 5: {
      return Mascot6;
    }
    case 6: {
      return Mascot7;
    }
    case 7: {
      return Mascot8;
    }
    case 8: {
      return Mascot9;
    }
    case 9: {
      return Mascot10;
    }
    case 10: {
      return Mascot11;
    }
    case 11: {
      return Mascot12;
    }
    case 12: {
      return Mascot13;
    }
    case 13: {
      return Mascot14;
    }
    case 14: {
      return Mascot15;
    }
    case 15: {
      return Mascot16;
    }
    case 16: {
      return Mascot17;
    }
    case 17: {
      return Mascot18;
    }
    case 18: {
      return Mascot19;
    }
    case 19: {
      return Mascot20;
    }
    case 20: {
      return Mascot21;
    }
    case 21: {
      return Mascot22;
    }
    case 22: {
      return Mascot23;
    }
    case 23: {
      return Mascot24;
    }
    case 24: {
      return BlankImage;
    }
    default:
      return BlankImage;
  }
};

/*Returns a reward image based on the index of the reward in the reward array 
retrieved from the database*/
export const getRewardImage = (index) => {
  switch (index) {
    case 0: {
      return Badge1;
    }
    case 5: {
      return Badge2;
    }
    case 10: {
      return Badge3;
    }
    case 15: {
      return Badge4;
    }
    case 20: {
      return Badge5;
    }
    case 1: {
      return Badge6;
    }
    case 6: {
      return Badge7;
    }
    case 11: {
      return Badge8;
    }
    case 16: {
      return Badge9;
    }
    case 21: {
      return Badge10;
    }
    case 2: {
      return Badge11;
    }
    case 7: {
      return Badge12;
    }
    case 12: {
      return Badge13;
    }
    case 17: {
      return Badge14;
    }
    case 22: {
      return Badge15;
    }
    case 3: {
      return Badge16;
    }
    case 8: {
      return Badge17;
    }
    case 13: {
      return Badge18;
    }
    case 18: {
      return Badge19;
    }
    case 23: {
      return Badge20;
    }
    case 4: {
      return Badge21;
    }
    case 9: {
      return Badge22;
    }
    case 14: {
      return Badge23;
    }
    case 19: {
      return Badge24;
    }
    case 24: {
      return Badge25;
    }
    case 25:{
      return Badge26;
    }
    case 26:{
      return Badge27;
    }
    case 27:{
      return Badge28;
    }
    case 28:{
      return Badge29;
    }
    case 29:{
      return Badge30;
    }
    case 30:{
      return Badge31;
    }
    default:
      console.log("The mascot images cannot be loaded");
      Swal.fire({
        title: "Oops, something went wrong!",
        text: "Please try to refresh the page",
        icon: "error",
        confirmButtonText: "OK",
      });
  }
};

export const getTeacherImage = (index) => {
  switch (index) {
    case 0: {
      return Teacher;
    }
    default:
      console.log("The teacher image cannot be loaded");
      Swal.fire({
        title: "Oops, something went wrong!",
        text: "Please try to refresh the page",
        icon: "error",
        confirmButtonText: "OK",
      });
  }
};
