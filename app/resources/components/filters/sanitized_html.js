App.filter('sanitized_html', function($sce) {
  return function(text) {
    return $sce.trustAsHtml(text);
  };
});
