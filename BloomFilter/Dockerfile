FROM gcc:latest
WORKDIR usr/src/exl 
COPY ./src/ .
RUN g++ -o exl ./main.cpp App.cpp AddUrl.cpp CheckUrl.cpp BloomFilter.cpp H1.cpp H2.cpp IHash.cpp
CMD ["./exl"]