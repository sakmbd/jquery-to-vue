$(function() {

  class App {
    constructor() { }

    setup() {
      let self = this;

      // setup UI interactions

      // sort by id property
      $('#sort-by-id').click(function (e) {
        $('.sort-btns button').removeClass('selected');
        $(this).addClass('selected');
        let todos = _.sortBy(self.data, ['id']);
        self.drawList(todos);
      });    

      // sort by order property
      $('#sort-by-order').click(function (e) {
        $('.sort-btns button').removeClass('selected');
        $(this).addClass('selected');
        let todos = _.sortBy(self.data, ['order']);
        self.drawList(todos);
      });    

      // random sort
      $('#sort-by-random').click(function (e) {
        $('.sort-btns button').removeClass('selected');
        $(this).addClass('selected');
        let todos = _.shuffle(self.data);
        self.drawList(todos);
      });    

      $('#todo-list').delegate('li','click',function (e) {
        let id = parseInt($(this).attr('id').replace('todo-','') || 1);
        let todo = _.find(self.data, ['id', id]);
        let details = `
          <h3>TODO</h3>
          <p>Id: ${todo.id}</p>
          <p>title: ${todo.title}</p>
          <p>order: ${todo.order}</p>
          <p>complete? ${todo.completed ? '<i class="fas fa-check"></i> yes' : '<i class="fas fa-times"></i> no'}</p>
        `;
        $('#todo-details').html(details);
      });    
      
      $('#todo-list').sortable();
      $('#todo-list').disableSelection();   
      $('#todo-list').on( "sortstop", function( event, ui ) {
        self.reorderList();
      });
    }

    renderError() {
      $('#loading-error').addClass('show');
      $('#todo-list').addClass('hide');
    }

    reorderList() {
      // rewrite order of the list based on list item elements in the UI
      let self = this;
      let todos = [];

      $('#todo-list li').each(function(index) {
        let id = parseInt($(this).attr('id').replace('todo-','') || 1);
        let todo = _.find(self.data, ['id', id]);
        
        if (todo) {
          todo.order = index;
          todos.push(todo);
        }
      });

      if (todos.length)
        this.save(todos);
    }

    drawList(todos) {
      $('#todo-list li').remove();
      $.each(todos, function( index, todo ) {
        let icon = (todo.completed) ? 'fa-check' : 'fa-times';
        $('#todo-list').append(`<li id="todo-${todo.id}" class="ui-state-default"><i class="fas ${icon}"></i> <span class="ui-icon ui-icon-arrowthick-2-n-s"></span>${todo.title}</li>`);
      });      
    }

    save(data) {
      this.data = data;
    }

    fetch(callback) {
      // fetch from server
      $.ajax({
        type: 'GET',
        url: 'https://jsonplaceholder.typicode.com/todos/',
        success: function(data) {
          callback(null, data);
        },
        error: function(xhr,err,e) {
          callback(err);
        }
      });
     }

    start() {
      this.fetch((err, todos) => {
        if (err || !todos) return this.renderError();
        this.setup();

        // at load time, add property "order" based on order returned from the server
        $.each(todos, function(index, todo) {
          todo.order = index;
        });      
  
        this.save(todos);
        this.drawList(todos);
      });
    }

  }

  let myApp = new App();
  myApp.start();

});