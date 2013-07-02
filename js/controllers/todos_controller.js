Todos.TodosController = Ember.ArrayController.extend({
	createTodo: function() {
		var title = this.get('newTitle');
		if (!title.trim()) { return; }

		var todo = Todos.Todo.createRecord({
			title: title,
			isCompleted: false
		});

		this.set('newTitle', '');

		todo.save();
	},

	remaining: function() {
		return this.filterProperty('isCompleted', false).get('length');
	}.property('@each.isCompleted'),

	completed: function() {
		return this.filterProperty('isCompleted', true).get('length');
	}.property('@each.isCompleted'),

	hasCompleted: function() {
		return this.get('completed') > 0;
	}.property('completed'),

	clearCompleted: function() {
		var completed = this.filterProperty('isCompleted', true);
		completed.invoke('deleteRecord');

		this.get('store').commit();
	},

	inflection: function() {
		var remaining = this.get('remaining');
		return remaining == 1 ? 'item' : 'items';
	}.property('remaining'),

	allAreDone: function (key, value) {
	  return !!this.get('length') && this.everyProperty('isCompleted', true);
	}.property('@each.isCompleted')
});