$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let username = e.target.value;

        //request to github
        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '1178504a091b4bbe37e9',
                client_secret: '6973d5fa6672ac59142d3869f543e8493402e1ec'
            }
        }).done(function(user){
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '1178504a091b4bbe37e9',
                    client_secret: '6973d5fa6672ac59142d3869f543e8493402e1ec',
                    sort: 'created: asc',
            
                }
            }).done(function(repos){
               $.each(repos, function(index, repo){
                   $('#repos').append(`
                    <div class="well">
                        <div class="row row-div">
                            <div class ="col-md-7">
                                <strong>${repo.name} </strong>: ${repo.description}
                            </div>
                            <div class ="col-md-3">
                                <span class="badge badge-warning">Forks: ${repo.forks_count}</span>
                                <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                                <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                            </div>
                            <div class ="col-md-2">
                                <a href="${repo.html_url}" target="_blank" class="btn btn-info">Repo Page</a><br>
                            </div>
                        </div>
                    </div>
                   `);
               })
            })
            $('#profile').html(`
<div class="panel panel-default">
  <div class="panel-heading">
    <h3 class="panel-title">${user.name}</h3>
  </div>
  <div class="panel-body">
    <div class ="row">
            <div class="col-md-3">
            <img class="thumbnail avatar" src="${user.avatar_url}">
            <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
            </div>
            <div class="col-md-9">
                <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                <span class="badge badge-warning">Public Gists: ${user.public_gists}</span>
                <span class="badge badge-success">Followers: ${user.followers}</span>
                <span class="badge badge-danger">Following: ${user.following}</span>
            <br>
            <ul class = "list-group">
                <li class ="list-group-item">Blog: ${user.blog}</li>
                <li class ="list-group-item">Location: ${user.location}</li>
                <li class ="list-group-item">Member Since: ${user.created_at}</li>
                <li class ="list-group-item">Repos URL: ${user.html_url}</li>
                <li class ="list-group-item">Repos URL:  ${user.repos_url}</li>
                <li class ="list-group-item">Repos URL: ${user.followers_url}</li>
            </ul>
            </div>
            
    </div>
  </div>
</div>
<h3 class ="page-header">Lastest Repos</h3>
            <div id ="repos"></div>
            `);
        });
    });

});