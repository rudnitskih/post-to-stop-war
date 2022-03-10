#!/usr/bin/env bash

baseImagesPath="./posters"
originalImages="${baseImagesPath}/*.jpg"


for image in "./posters"/*.{jpg,png,gif}; do
    printf '%s\n' "$image"
    baseName=$(basename "$image")
    echo "Processing ${baseName}..."
    convert "${image}" -resize "1000x^" -quality 80 "./posters_optimized/$baseName"
done
