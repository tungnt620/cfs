export function sendGAUserBehaviorEvent({ category, action, label }) {
  window?.ga?.('send', {
    hitType: 'event',
    eventCategory: category,
    eventAction: action,
    eventLabel: label,
    appVersion: window?.appVersion,
  });
}
