import Parse from "parse";

async function updatePointsOnCorrectAnswer(
  student,
  studentId,
  category,
  currentQuestionId,
  studentLevel,
  new_total_points,
  new_total_coins,
  categoryCompleteNotification
) {
  student.set("total_points", new_total_points);
  student.set("coins", new_total_coins);

  const Progress = Parse.Object.extend("Progress");
  const query = new Parse.Query(Progress);
  query.equalTo("user_id", studentId);
  query.equalTo("category_name", category);
  const res = await query.find();
  const progressTable = res[0];

  query
    .get(progressTable["id"])
    .then((obj) => {
      obj.add("correct_question_ids", currentQuestionId);
      obj.save();
    })
    .catch((error) => {
      console.log(error);
    });
  student.increment("total_correct_questions");

  var correct_question_ids = progressTable.get("correct_question_ids");

  if (correct_question_ids.length === 7) {
    if (studentLevel === 3) {
      student.set(category + "_level", 1);
      categoryCompleteNotification();
    } else {
      progressTable.increment("current_level");
      progressTable.set("correct_question_ids", []);
    }
  }
}


export { updatePointsOnCorrectAnswer };
