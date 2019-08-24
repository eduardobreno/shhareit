import axios from "axios";
import Activity from "../../entities/ActivityEntity";

async function getActivity() {
  const { data } = await axios.get("http://demo6528292.mockable.io/activity");
  const activity = new Activity(data);

  return activity;
}

const ActivityAPI = {
  getActivity
}

export default ActivityAPI;