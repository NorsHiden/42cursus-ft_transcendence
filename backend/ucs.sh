#!/bin/bash
mkdir -s routers services interfaces tests > /dev/null 2>&1

mv *spec.* tests/ > /dev/null 2>&1
mv *controller.* routers/ > /dev/null 2>&1
mv *service.* services/	> /dev/null 2>&1
mv *interface.* interfaces/	> /dev/null 2>&1

echo -e "\e[1;32mDone!\e[0m"