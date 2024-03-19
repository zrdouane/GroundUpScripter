/**
 * Checks if a given route is the current active route.
 * @param {string} route - The route to check.
 * @param {string} currentRoute - The current active route.
 * @returns {string} - Returns 'active' if the route is the current active route, otherwise returns an empty string.
 */
function isActiveRoute(route, currentRoute) {
    return route === currentRoute ? 'active' : '';
  }
  
module.exports = { isActiveRoute };