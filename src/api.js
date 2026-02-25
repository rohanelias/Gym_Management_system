const API_BASE = "http://localhost/gym-backend";

const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export const getMembers = async () => {
  const response = await fetch(`${API_BASE}/get_members.php`);
  return handleResponse(response);
};

export const getTrainers = async () => {
  const response = await fetch(`${API_BASE}/get_trainers.php`);
  return handleResponse(response);
};

export const addMember = async (memberData) => {
  const response = await fetch(`${API_BASE}/add_member.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(memberData),
  });
  return handleResponse(response);
};

export const addTrainer = async (trainerData) => {
  const response = await fetch(`${API_BASE}/add_trainer.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(trainerData),
  });
  return handleResponse(response);
};

export const assignTrainerToMember = async (memberId, trainerId) => {
  const response = await fetch(`${API_BASE}/assign_member_to_trainer.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ member_id: memberId, trainer_id: trainerId }),
  });
  return handleResponse(response);
};

export const getPayments = async () => {
  const response = await fetch(`${API_BASE}/get_payments.php`);
  return handleResponse(response);
};

export const addPayment = async (uid, amount) => {
  const body = new URLSearchParams();
  body.append("uid", uid);
  body.append("amount", amount);

  const response = await fetch(`${API_BASE}/add_payment.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });
  return handleResponse(response);
};

export const getAttendance = async () => {
  const response = await fetch(`${API_BASE}/get_attendance.php`);
  return handleResponse(response);
};

export const markAttendance = async (memberId) => {
  const response = await fetch(`${API_BASE}/mark_attendance.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ member_id: Number(memberId) }),
  });
  return handleResponse(response);
};

export const getTrainerMembers = async (trainerId) => {
  const response = await fetch(
    `${API_BASE}/get_trainer_members.php?trainer_id=${trainerId}`
  );
  return handleResponse(response);
};

export const getWorkoutPlans = async (trainerId) => {
  const response = await fetch(
    `${API_BASE}/get_workout_plans.php?trainer_id=${trainerId}`
  );
  return handleResponse(response);
};

export const addWorkoutPlan = async (planData) => {
  const response = await fetch(`${API_BASE}/add_workout_plan.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(planData),
  });
  return handleResponse(response);
};

export const getDietPlans = async (trainerId) => {
  const response = await fetch(
    `${API_BASE}/get_diet_plans.php?trainer_id=${trainerId}`
  );
  return handleResponse(response);
};

export const addDietPlan = async (planData) => {
  const response = await fetch(`${API_BASE}/add_diet_plan.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(planData),
  });
  return handleResponse(response);
};

export const getUserProfile = async (userId) => {
  const response = await fetch(
    `${API_BASE}/get_user_profile.php?user_id=${userId}`
  );
  return handleResponse(response);
};

