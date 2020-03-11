import { UPDATE_X_HYPERSLAB, UPDATE_Y_HYPERSLAB } from "./types";

const updateHyperslabX = (updatedHyperslab, state) => {
  return { ...state, xAxisHyperslab: updatedHyperslab };
};

const updateHyperslabY = (updatedHyperslabs, state) => {
  const newHyperslabs = updatedHyperslabs;
  return { ...state, yAxisHyperslab: newHyperslabs };
};

const UPDATE_METRIC = (updatedMetric, state) => {
  return { ...state, metric: updatedMetric };
};

export default (state, action) => {
  switch (action.type) {
    case UPDATE_X_HYPERSLAB:
      return updateHyperslabX(action.payload, state);
    case UPDATE_Y_HYPERSLAB:
      return updateHyperslabY(action.payload, state);
    case UPDATE_METRIC:
      return UPDATE_METRIC(action.payload, state);
    default:
      return state;
  }
};
