const routes = {
  main: '/',
  questionsItem: '/questions/:questionId',
};

const build = (route, params = {}) => {
  return Object.keys(params).reduce((acc, key) => acc.replace(`:${key}`, params[key]), routes[route]);
};

export { build, routes };

export default { build, routes };
