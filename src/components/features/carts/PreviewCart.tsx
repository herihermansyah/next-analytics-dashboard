"use client";

import {CartsType} from "@/types";
import axios from "axios";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";
import ButtonBack from "@/components/ButtonBack";
import {motion} from "motion/react";

function PreviewCart() {
  const [cart, setCart] = useState<CartsType | null>(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/carts/${id}`);
        setCart(response.data);
      } catch {}
    };
    fetchCart();
  }, [id]);

  if (!cart) {
    return (
      <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
        Loading cart...
      </div>
    );
  }

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}
    >
      <div className="mb-5">
        <ButtonBack />
      </div>
      <div className="flex flex-col gap-5">
        <Card className="shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl">Cart ID #{cart.id}</CardTitle>
            <CardTitle className="text-xl">User ID #{cart.userId}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-muted/40">
                <p className="text-xs text-muted-foreground">Total Products</p>
                <p className="text-lg font-semibold">{cart.totalProducts}</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40">
                <p className="text-xs text-muted-foreground">Total Quantity</p>
                <p className="text-lg font-semibold">{cart.totalQuantity}</p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40">
                <p className="text-xs text-muted-foreground">Total Price</p>
                <p className="text-lg font-semibold">
                  $ {cart.total.toLocaleString()}
                </p>
              </div>

              <div className="p-3 rounded-lg bg-muted/40">
                <p className="text-xs text-muted-foreground">
                  Discounted Total
                </p>
                <p className="text-lg font-semibold text-green-600 dark:text-green-500">
                  $ {cart.discountedTotal.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Separator />
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Products</h2>

          <div className="grid gap-4">
            {cart.products.map((item) => (
              <Card key={item.id} className="border rounded-xl shadow-sm">
                <CardContent className="flex gap-4 p-4">
                  {/* Thumbnail */}
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={300}
                    height={300}
                    loading="eager"
                    className="w-20 h-20 rounded-lg object-cover border"
                  />

                  {/* Product Content */}
                  <div className="flex-1">
                    <p className="font-medium">{item.title}</p>

                    <div className="flex flex-wrap gap-2 mt-1">
                      <Badge variant="secondary">
                        Price: ${item.price.toLocaleString()}
                      </Badge>
                      <Badge variant="secondary">Qty: {item.quantity}</Badge>
                      <Badge variant="outline">
                        Discount {item.discountPercentage}%
                      </Badge>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-muted-foreground">
                      Total: ${item.total.toLocaleString()} →{" "}
                      <span className="text-green-600 dark:text-green-500">
                        ${item.discountedTotal.toLocaleString()}
                      </span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PreviewCart;
