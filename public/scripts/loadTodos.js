$(function () {
  $.ajax({
    url: `/api/todos/all`,
    type: "GET",
    success: function (memoRows) {
      console.log("These are the memoRows", memoRows);

      function createMemoElement(todo) {
        return `
                  <ul class="list-group list-group-horizontal rounded-0 bg-transparent">
                <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                  <div class="form-check">
                    <input
                      class="form-check-input me-0"
                      type="checkbox"
                      value=""
                      id="flexCheckChecked1"
                      aria-label="..."
                      checked
                    />
                  </div>
                </li>
                <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                  <p class="lead fw-normal mb-0">${todo.memo}</p>
                </li>
                <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                  <div class="d-flex flex-row justify-content-end mb-1">
                    <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i class="fas fa-pencil-alt me-3"></i></a>
                    <a href="#!" class="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><i class="fas fa-trash-alt"></i></a>
                  </div>
                  <div class="text-end text-muted">
                    <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
                      <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>${todo.timestamp}</p></a>
                  </div>
                </li>
              </ul>
      `;
      }

      let memoList = [];

      for (const memoSet of memoRows) {
        memoList.push(createMemoElement(memoSet));
      }
      memoList = memoList.reverse().join("\n");

      $("#todo-list").empty().append(memoList);
      // console.log(e)
    },
    error: function (xhr, exception) {
      var msg = "";
      if (xhr.status === 0) {
        msg = "Not connect.\n Verify Network." + xhr.responseText;
      } else if (xhr.status == 404) {
        msg = "Requested page not found. [404]" + xhr.responseText;
      } else if (xhr.status == 500) {
        msg = "Internal Server Error [500]." + xhr.responseText;
      } else if (exception === "parsererror") {
        msg = "Requested JSON parse failed.";
      } else if (exception === "timeout") {
        msg = "Time out error." + xhr.responseText;
      } else if (exception === "abort") {
        msg = "Ajax request aborted.";
      } else {
        msg = "Error:" + xhr.status + " " + xhr.responseText;
      }
    },
  });
  $(".submit-type").submit(function (e) {
    e.preventDefault();
    console.log(
      "These are the e.currentTarget... from the submition:",
      e.currentTarget.attributes.value.nodeValue
    );

    const endPoint = e.currentTarget.attributes.value.nodeValue;

    $.ajax({
      url: `/api/todos/${endPoint}`,
      type: "GET",
      success: function (memoRows) {
        console.log("These are the memoRows in the ajax rewuest: ", memoRows);

        function createMemoElement(todo) {
          return `
                    <ul class="list-group list-group-horizontal rounded-0 bg-transparent">
                  <li class="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                    <div class="form-check">
                      <input
                        class="form-check-input me-0"
                        type="checkbox"
                        value=""
                        id="flexCheckChecked1"
                        aria-label="..."
                        checked
                      />
                    </div>
                  </li>
                  <li class="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                    <p class="lead fw-normal mb-0">${todo.memo}</p>
                  </li>
                  <li class="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                    <div class="d-flex flex-row justify-content-end mb-1">
                      <a href="#!" class="text-info" data-mdb-toggle="tooltip" title="Edit todo"><i class="fas fa-pencil-alt me-3"></i></a>
                      <a href="#!" class="text-danger" data-mdb-toggle="tooltip" title="Delete todo"><i class="fas fa-trash-alt"></i></a>
                    </div>
                    <div class="text-end text-muted">
                      <a href="#!" class="text-muted" data-mdb-toggle="tooltip" title="Created date">
                        <p class="small mb-0"><i class="fas fa-info-circle me-2"></i>${todo.timestamp}</p></a>
                    </div>
                  </li>
                </ul>
        `;
        }

        let memoList = [];

        for (const memoSet of memoRows) {
          memoList.push(createMemoElement(memoSet));
        }
        memoList = memoList.join("\n");

        $("#todo-list").empty().append(memoList).stop();

        $("body").on("DOMNodeInserted", "table", function () {
          $("td:visible").translate("es", "en");
        });
      },
      error: function (xhr, exception) {
        var msg = "";
        if (xhr.status === 0) {
          msg = "Not connect.\n Verify Network." + xhr.responseText;
        } else if (xhr.status == 404) {
          msg = "Requested page not found. [404]" + xhr.responseText;
        } else if (xhr.status == 500) {
          msg = "Internal Server Error [500]." + xhr.responseText;
        } else if (exception === "parsererror") {
          msg = "Requested JSON parse failed.";
        } else if (exception === "timeout") {
          msg = "Time out error." + xhr.responseText;
        } else if (exception === "abort") {
          msg = "Ajax request aborted.";
        } else {
          msg = "Error:" + xhr.status + " " + xhr.responseText;
        }
      },
    });
  });
});
