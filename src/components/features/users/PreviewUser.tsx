"use client";

import axios from "axios";
import {useParams} from "next/navigation";
import React, {useEffect, useState} from "react";
import {UsersType} from "@/types/user.types";

// shadcn components
import {Card, CardHeader, CardContent} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {Avatar, AvatarImage, AvatarFallback} from "@/components/ui/avatar";
import ButtonBack from "@/components/ButtonBack";
import {motion} from "motion/react"

function PreviewUser() {
  const [user, setUser] = useState<UsersType | null>(null);
  const {id} = useParams();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        setUser(response.data);
      } catch {
      }
    };
    fetchUserId();
  }, [id]);

  if (!user) return <p className="text-center py-10">Loading...</p>;

  return (
    <motion.div
      initial={{opacity: 0, scale: 0}}
      animate={{opacity: 1, scale: 1}}
      transition={{duration: 0.3}}
    >
      {/* PROFILE CARD */}
      <div className="mb-5">
        <ButtonBack />
      </div>
      <Card className="border border-zinc-200 dark:border-zinc-800 shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="h-20 w-20 rounded-xl ">
            <AvatarImage src={user.image} />
            <AvatarFallback>
              {user.firstName?.charAt(0)}
              {user.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>

            <div className="flex gap-2 mt-2">
              <Badge variant="outline">{user.gender}</Badge>
              <Badge>{user.age} tahun</Badge>
              <Badge className="capitalize">{user.role}</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 mt-4">
          {/* PERSONAL INFO */}
          <section>
            <h3 className="font-medium text-lg">Personal Info</h3>
            <Separator className="my-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Username</p>
                <p className="font-medium">{user.username}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Birth Date</p>
                <p className="font-medium">{user.birthDate}</p>
              </div>

              <div>
                <p className="text-muted-foreground">University</p>
                <p className="font-medium">{user.university}</p>
              </div>
            </div>
          </section>

          {/* ADDRESS */}
          <section>
            <h3 className="font-medium text-lg">Address</h3>
            <Separator className="my-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Street</p>
                <p className="font-medium">{user.address.address}</p>
              </div>

              <div>
                <p className="text-muted-foreground">City</p>
                <p className="font-medium">{user.address.city}</p>
              </div>

              <div>
                <p className="text-muted-foreground">State</p>
                <p className="font-medium">
                  {user.address.state} ({user.address.stateCode})
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Postal Code</p>
                <p className="font-medium">{user.address.postalCode}</p>
              </div>
            </div>
          </section>

          {/* COMPANY */}
          <section>
            <h3 className="font-medium text-lg">Company</h3>
            <Separator className="my-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{user.company.name}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Department</p>
                <p className="font-medium">{user.company.department}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Title</p>
                <p className="font-medium">{user.company.title}</p>
              </div>
            </div>
          </section>

          {/* BANK */}
          <section>
            <h3 className="font-medium text-lg">Bank</h3>
            <Separator className="my-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Card Number</p>
                <p className="font-medium">{user.bank.cardNumber}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Card Type</p>
                <p className="font-medium">{user.bank.cardType}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Expire</p>
                <p className="font-medium">{user.bank.cardExpire}</p>
              </div>

              <div>
                <p className="text-muted-foreground">IBAN</p>
                <p className="font-medium">{user.bank.iban}</p>
              </div>
            </div>
          </section>

          {/* CRYPTO */}
          <section>
            <h3 className="font-medium text-lg">Crypto Wallet</h3>
            <Separator className="my-2" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Coin</p>
                <p className="font-medium">{user.crypto.coin}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Network</p>
                <p className="font-medium">{user.crypto.network}</p>
              </div>

              <div className="col-span-2">
                <p className="text-muted-foreground">Wallet</p>
                <p className="font-medium wrap-break-word">
                  {user.crypto.wallet}
                </p>
              </div>
            </div>
          </section>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default PreviewUser;
