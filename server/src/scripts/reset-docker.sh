# Reset docker. Be careful!
docker image prune -y
docker rmi $(docker images -a -q)
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker system prune -f
docker system prune -a -f
docker volume prune -f
docker network prune -f
