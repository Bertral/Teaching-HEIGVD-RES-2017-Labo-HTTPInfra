docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker build -t task5 .
docker run -d task4-1
docker run -d task4-1
docker run -d task4-1
docker run -d --name apache_static task4-1
docker run -d task4-2
docker run -d task4-2
docker run -d --name express_dynamic task4-2

docker inspect apache_static | grep -i ipaddr
docker inspect express_dynamic | grep -i ipaddr
