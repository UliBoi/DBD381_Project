@echo off
cd /d %~dp0
echo Starting MongoDB Secondary node (rs2)...
mongod --dbpath "..\mongo-replica\rs2" --port 27118 --replSet rs0 --bind_ip localhost
