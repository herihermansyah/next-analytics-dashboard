"use client";

import {ProductsType} from "@/types";
import axios from "axios";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {Card, CardContent} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import ButtonBack from "@/components/ButtonBack";
import {motion} from "motion/react";

function PreviewProduct() {
  const [product, setProduct] = useState<ProductsType | null>(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
      } catch {}
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}
    >
      {/* ========================= HEADER ========================= */}
      <div className="mb-5">
        <ButtonBack />
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">{product.title}</h1>

        <p className="text-muted-foreground text-sm">{product.category}</p>

        <div className="flex items-center gap-4 text-sm">
          <span className="font-semibold text-xl">${product.price}</span>
          <span className="text-yellow-500">⭐ {product.rating}</span>
          <span className="text-muted-foreground">
            {product.discountPercentage}% OFF
          </span>
        </div>

        <Separator className="mb-5" />
      </div>

      {/* ========================= MAIN CONTENT ========================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
        {/* ---------- LEFT MEDIA ---------- */}
        <div className="space-y-6">
          {/* Thumbnail */}
          <Card className="rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={product.thumbnail}
                alt="Thumbnail"
                width={600}
                height={600}
                className=" object-cover"
              />
            </CardContent>
          </Card>

          {/* Gallery Images */}
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, index) => (
              <Card
                key={index}
                className="rounded-lg overflow-hidden bg-muted/30 border"
              >
                <CardContent className="p-0">
                  <Image
                    src={img}
                    width={400}
                    height={400}
                    alt={`Image ${index}`}
                    className="w-full h-24 object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* QR Code */}
          <div className="space-y-2">
            <p className="font-semibold text-sm">QR Code</p>
            <Card className="w-40 rounded-xl overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src={product.meta.qrCode}
                  alt="QR Code"
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ---------- RIGHT DETAILS ---------- */}
        <div className="space-y-6">
          {/* Description */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </CardContent>
          </Card>

          {/* Product Specs */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="font-semibold text-lg">Product Information</h2>

              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <p className="font-semibold">Brand</p>
                  <p className="text-muted-foreground">{product.brand}</p>
                </div>

                <div>
                  <p className="font-semibold">SKU</p>
                  <p className="text-muted-foreground">{product.sku}</p>
                </div>

                <div>
                  <p className="font-semibold">Stock</p>
                  <p className="text-muted-foreground">{product.stock}</p>
                </div>

                <div>
                  <p className="font-semibold">Weight</p>
                  <p className="text-muted-foreground">{product.weight} g</p>
                </div>

                <div>
                  <p className="font-semibold">Availability</p>
                  <p className="text-muted-foreground">
                    {product.availabilityStatus}
                  </p>
                </div>

                <div>
                  <p className="font-semibold">Minimum Order</p>
                  <p className="text-muted-foreground">
                    {product.minimumOrderQuantity}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Dimensions */}
              <div className="text-sm">
                <p className="font-semibold mb-1">Dimensions</p>
                <p className="text-muted-foreground">
                  {product.dimensions.width} × {product.dimensions.height} ×{" "}
                  {product.dimensions.depth} cm
                </p>
              </div>

              <Separator />

              {/* Tags */}
              <div className="text-sm">
                <p className="font-semibold mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-muted text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping + Warranty */}
          <Card>
            <CardContent className="p-6 space-y-6">
              <h2 className="font-semibold text-lg">Shipping & Warranty</h2>

              <div className="text-sm space-y-4">
                <div>
                  <p className="font-semibold mb-1">Shipping Info</p>
                  <p className="text-muted-foreground">
                    {product.shippingInformation}
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1">Warranty</p>
                  <p className="text-muted-foreground">
                    {product.warrantyInformation}
                  </p>
                </div>

                <div>
                  <p className="font-semibold mb-1">Return Policy</p>
                  <p className="text-muted-foreground">
                    {product.returnPolicy}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Meta */}
          <Card>
            <CardContent className="p-6 text-xs text-muted-foreground space-y-1">
              <p>Created: {product.meta.createdAt}</p>
              <p>Updated: {product.meta.updatedAt}</p>
              <p>Barcode: {product.meta.barcode}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ========================= REVIEWS ========================= */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>

        <div className="space-y-4">
          {product.reviews.map((rev, idx) => (
            <Card key={idx}>
              <CardContent className="p-4 text-sm space-y-1">
                <div className="font-semibold">{rev.reviewerName}</div>
                <div className="text-xs text-muted-foreground">
                  {rev.date} — {rev.reviewerEmail}
                </div>
                <div className="text-yellow-500">⭐ {rev.rating}/5</div>
                <p className="text-muted-foreground">{rev.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default PreviewProduct;
