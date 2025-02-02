const BASE = 'http://127.0.0.1:8000/api';

const url = {
  BASE,
  login: `/login`,
  logout: `/logout/`,
  signup: `/signup`,
  incident: `/incident/`, // Base endpoint for incident operations
  getIncident: (id) => `/incident/${id}/`, // Get a specific incident by ID
};

const dev = {
  url,
};

export const config = dev;
