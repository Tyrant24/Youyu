Chart.aa=function(date){
  //  $("body").css("background","red");
  //alert(1);
  // $("#example1").DataTable();
  $('#example1').DataTable({
    "paging": true,
    "lengthChange": true,
    "searching": false,
    "ordering": true,
    "info": true,
    "autoWidth": true,
  });
}
Chart.toast=function(con){
    toastr.error(con)
}
Chart.saveing=function(){
  toastr.success("提示：操作成功")
}
Chart.succ=function(com){
  toastr.success(com)
}
Chart.hidemodel=function(){

  $("#modal-default3").modal('hide');
}
Chart.warning=function(title,subtitle,body){
  $(document).Toasts('create', {
    class: 'bg-warning', 
    title: title,
    subtitle: subtitle,
    body: body
  })
}
Chart.setselect2=function(fid,callback){
  $("#"+fid).select2({
    theme: 'bootstrap4'
  });
  $("#"+fid).change(()=>{
    callback($("#"+fid).val());
  });
}